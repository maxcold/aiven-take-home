import express, { NextFunction, Request, Response, Router } from 'express';
import fetch from 'node-fetch';

import * as config from '../../config.js';
import { sortCloudsByDistance } from "./utils.js";

const router: Router = express.Router();
const aivenApiUrl = config.aivenApiUrl;
let dataCached: Clouds;

router.get('/', async (req: Request, res: Response, next:NextFunction) => {
    try {
        if (!dataCached) {
            const response = await fetch(`${aivenApiUrl}/v1/clouds`);
            const data: Clouds = await response.json() as Clouds;
            dataCached = data;
        }

        const query = req.query;
        let resultClouds = [...dataCached.clouds]

        if (query.provider) {
            const provider = query.provider;

            resultClouds = resultClouds.filter(cloud => cloud.provider === provider);
        }

        if (query.sort && query.lat && query.lon) {
            const sort = query.sort;
            const lat = query.lat && (typeof query.lat === 'string') && parseFloat(query.lat);
            const lon = query.lon && (typeof query.lon === 'string') && parseFloat(query.lon);
            let direction: SortDirection | undefined

            switch (sort) {
                case 'geo_asc':
                    direction = 'asc';
                    break;
                case 'geo_desc':
                    direction = 'desc';
                    break;
            }

            if (direction && lat && lon) {
                resultClouds = resultClouds.sort(sortCloudsByDistance(direction, lat, lon));
            }
        }

        res.send(resultClouds);
    } catch (error) {
        return next(error);
    }
});

router.get('/providers', async (req, res, next) => {
    try {
        if (!dataCached) {
            const response = await fetch(`${aivenApiUrl}/v1/clouds`);
            const data: Clouds = await response.json() as Clouds;
            dataCached = data;
        }
        const uniqueProviders: string[] = [];
        const providers = dataCached.clouds.reduce((res: Providers, cloud: Cloud) => {
            if (!uniqueProviders.includes(cloud.provider)) {
                uniqueProviders.push(cloud.provider);

                res.push({
                    key: cloud.provider,
                    name: cloud.provider_description
                });
            }

            return res;
        }, []);
        res.send(providers);
    }
    catch (error) {
        return next(error);
    }
});

export default router;
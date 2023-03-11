import express, { NextFunction, Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import * as config from '../../config.js';

interface Cloud {
    cloud_name: string;
    cloud_description: string;
    geo_longitude: number;
    geo_latitude: number;
    geo_region: string;
    provider: string;
    provider_description: string;
}
interface Clouds {
    clouds: Array<Cloud>;
}

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

        res.send(dataCached);
    } catch (error) {
        return next(error);
    }
});

export default router;
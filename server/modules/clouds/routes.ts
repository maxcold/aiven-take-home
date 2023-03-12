import express, { NextFunction, Request, Response, Router } from 'express'
import fetch from 'node-fetch'
import NodeCache from 'node-cache'

import * as config from '../../config.js'
import { sortCloudsByDistance, getUniqueProviders, filterCloudsByProvider } from './utils.js'

const cache = new NodeCache({ stdTTL: 60 * 60 * 24, checkperiod: 60 * 60 * 24 })
const router: Router = express.Router()
const aivenApiUrl = config.aivenApiUrl

const getClouds = async () => {
    let clouds: Clouds | undefined = cache.get('clouds')

    if (!clouds) {
        const response = await fetch(`${aivenApiUrl}/v1/clouds`)
        const data: CloudsResponse = await response.json() as CloudsResponse

        clouds = data.clouds
        cache.set('clouds', clouds)
    }

    return clouds
}

router.get('/', async (req: Request, res: Response, next:NextFunction) => {
    try {
        const clouds = await getClouds()

        const query = req.query
        let resultClouds = [...clouds]

        if (query.provider && typeof query.provider === 'string') {
            const provider = query.provider

            resultClouds = filterCloudsByProvider(resultClouds, provider)
        }

        if (query.sort && query.lat && query.lon) {
            const sort = query.sort
            const lat = query.lat && (typeof query.lat === 'string') && parseFloat(query.lat)
            const lon = query.lon && (typeof query.lon === 'string') && parseFloat(query.lon)
            let direction: SortDirection | undefined

            switch (sort) {
            case 'geo_asc':
                direction = 'asc'
                break
            case 'geo_desc':
                direction = 'desc'
                break
            }

            if (direction && lat && lon) {
                resultClouds = resultClouds.sort(sortCloudsByDistance(direction, lat, lon))
            }
        }

        res.send(resultClouds)
    } catch (error) {
        return next(error)
    }
})

router.get('/providers', async (req, res, next) => {
    try {
        const clouds = await getClouds()
        const providers = getUniqueProviders(clouds)
        res.send(providers)
    }
    catch (error) {
        return next(error)
    }
})

export default router
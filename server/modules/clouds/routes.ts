import express, { NextFunction, Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import * as config from '../../config.js';

const router: Router = express.Router();
const aivenApiUrl = config.aivenApiUrl;

router.get('/', async (req: Request, res: Response, next:NextFunction) => {
    try {
        const response = await fetch(`${aivenApiUrl}/v1/clouds`);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        return next(error);
    }
});

export default router;
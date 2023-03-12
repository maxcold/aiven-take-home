import express, { Express, Request, Response } from 'express';
import cloudsRoutes from './modules/clouds/routes.js';
import * as config from './config.js';

const app: Express = express();
const port = config.port;

app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    next();
});

app.use('/clouds', cloudsRoutes)
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
import express, { Express, Request, Response } from 'express';
import cloudsRoutes from './modules/clouds/routes.js';
import * as config from './config.js';

const app: Express = express();
const port = config.port;

app.use('/clouds', cloudsRoutes)
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
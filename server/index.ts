import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cloudsRoutes from './modules/clouds/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/clouds', cloudsRoutes)
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
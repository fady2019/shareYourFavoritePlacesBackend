import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

import tokenRoutes from './routes/token-routes';
import placesRoutes from './routes/places-routes';
import usersRoutes from './routes/users-routes';
import ResponseError from './models/response-error';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mediaPath = process.env.MEDIA_DIR_PATH as string;

app.use(`/${mediaPath}`, express.static(path.join(__dirname, '..', path.sep, mediaPath)));

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN as string);
    res.setHeader('Access-Control-Allow-Methods', process.env.ACCESS_CONTROL_ALLOW_METHODS as string);
    res.setHeader('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS as string);

    next();
});

app.use('/token', tokenRoutes);

app.use('/places', placesRoutes);

app.use('/users', usersRoutes);

// not found route
app.use((req, _res, _next) => {
    throw new ResponseError(`'${req.url}' route not found!`, 404);
});

app.use((err: any, _req: any, res: any, _next: any) => {
    const message = err.message || 'an unknown error have been occurred!';
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message,
    });
});

mongoose
    .connect(process.env.MONGODB_CONNECTION_URI as string, {
        user: process.env.MONGODB_CONNECTION_USERNAME,
        pass: process.env.MONGODB_CONNECTION_PASSWORD,
        autoIndex: false, // should be added on production
    })
    .then(() => {
        app.listen(process.env.PORT || 8080);
    })
    .catch((error) => {
        console.log(error);
    });

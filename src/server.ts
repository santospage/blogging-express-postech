import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import categoryRoutes from './routes/CategoryRouters';
import classRoutes from './routes/ClassRouters';

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority', appName: 'Cluster0' })
  .then(() => {
    Logging.info('Connected to Blogging.');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect: ');
    Logging.error(error);
  });

const StartServer = () => {
  router.use((req, res, next) => {
    //Request
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      //Response
      Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] Status: [${res.statusCode}]`);
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  //Rules of API
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorizathion');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  //Routes
  router.use('/blogging', categoryRoutes);
  router.use('/blogging', classRoutes);

  //Healthcheck
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  //Error handling
  router.use((req, res, next) => {
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};

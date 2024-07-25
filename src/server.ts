import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './middlewares/logging';
import categoryRoutes from './routes/category-routes';
import classRoomRoutes from './routes/classroom-routes';
import userRoutes from './routes/user-routes';
import loginRoutes from './routes/login-routes';
import errorHandling from './middlewares/error-handler';
import manipulator404 from './middlewares/manipulator404';

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

  //Routes
  router.use('/blogging', new categoryRoutes().getCategoryRouter());
  router.use('/blogging', new classRoomRoutes().getClassRoomRouter());
  router.use('/blogging', new userRoutes().getUserRouter());
  router.use('/blogging', new loginRoutes().getLoginRouter());

  router.use(manipulator404);
  router.use(errorHandling);

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};

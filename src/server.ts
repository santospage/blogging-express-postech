import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority', appName: 'Cluster0' })
  .then(() => {
    console.log('connected');
  })
  .catch((error) => {
    console.log(error);
  });

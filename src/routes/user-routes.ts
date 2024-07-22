import express from 'express';

import userController from '../controllers/user-controller';
import userAuthorization from '../middlewares/user-authorization';

export default class UserRouter {
  private router = express.Router();

  public getUserRouter() {
    this.router.get('/users', userAuthorization, (req, res, next) => new userController(req, res, next).listUsers());
    this.router.get('/users/:id', userAuthorization, (req, res, next) => new userController(req, res, next).listUserById());
    this.router.post('/users', userAuthorization, (req, res, next) => new userController(req, res, next).createUser());
    this.router.put('/users/:id', userAuthorization, (req, res, next) => new userController(req, res, next).updateUser());
    this.router.delete('/users/:id', userAuthorization, (req, res, next) => new userController(req, res, next).deleteUser());

    return this.router;
  }
}

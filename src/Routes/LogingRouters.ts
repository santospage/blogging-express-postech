import express from 'express';
import loginController from '../Controllers/LoginController';

export default class LoginRouter {
  private router = express.Router();

  public getLoginRouter() {
    this.router.post('/login', (req, res, next) => new loginController(req, res, next).loginUser());
    return this.router;
  }
}

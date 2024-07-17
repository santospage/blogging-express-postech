import express from 'express';
import classController from '../Controllers/ClassController';

export default class ClassRouter {
  private router = express.Router();

  public getClassRouter() {
    this.router.get('/classes', (req, res, next) => new classController(req, res, next).listClass());
    this.router.get('/classes/:id', (req, res, next) => new classController(req, res, next).listClassById());
    this.router.post('/classes', (req, res, next) => new classController(req, res, next).createClass());
    this.router.put('/classes/:id', (req, res, next) => new classController(req, res, next).updateClass());
    this.router.delete('/classes/:id', (req, res, next) => new classController(req, res, next).deleteClass());

    return this.router;
  }
}

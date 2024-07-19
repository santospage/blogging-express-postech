import express from 'express';
import classRoomController from '../Controllers/ClassRoomController';

export default class ClassRoomRouter {
  private router = express.Router();

  public getClassRoomRouter() {
    this.router.get('/classes', (req, res, next) => new classRoomController(req, res, next).listClasses());
    this.router.get('/classes/:id', (req, res, next) => new classRoomController(req, res, next).listClassRoomById());
    this.router.post('/classes', (req, res, next) => new classRoomController(req, res, next).createClassRoom());
    this.router.put('/classes/:id', (req, res, next) => new classRoomController(req, res, next).updateClassRoom());
    this.router.delete('/classes/:id', (req, res, next) => new classRoomController(req, res, next).deleteClassRoom());

    return this.router;
  }
}

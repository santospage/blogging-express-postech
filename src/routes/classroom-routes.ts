import express from 'express';

import classRoomController from '../controllers/classroom-controller';
import userAuthorization from '../middlewares/user-authorization';

export default class ClassRoomRouter {
  private router = express.Router();

  public getClassRoomRouter() {
    this.router.get('/classes', (req, res, next) => new classRoomController(req, res, next).listClasses());
    this.router.get('/classes/managerial', userAuthorization, (req, res, next) => new classRoomController(req, res, next).listClassesManagerial());
    this.router.get('/classes/search', (req, res, next) => new classRoomController(req, res, next).listClassesByFilter());
    this.router.get('/classes/:id', (req, res, next) => new classRoomController(req, res, next).listClassRoomById());
    this.router.post('/classes', userAuthorization, (req, res, next) => new classRoomController(req, res, next).createClassRoom());
    this.router.put('/classes/:id', userAuthorization, (req, res, next) => new classRoomController(req, res, next).updateClassRoom());
    this.router.delete('/classes/:id', userAuthorization, (req, res, next) => new classRoomController(req, res, next).deleteClassRoom());

    return this.router;
  }
}

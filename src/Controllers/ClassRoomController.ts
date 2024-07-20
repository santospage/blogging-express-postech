import { NextFunction, Response, Request } from 'express';
import ClassRoomService from '../Services/ClassRoomService';
import IClassRoom from '../Interfaces/IClassRoom';
import mongoose from 'mongoose';
import NotFound from '../Errors/NotFound';

export default class ClassRoomController {
  private res: Response;
  private req: Request;
  private next: NextFunction;
  private classRoomService: ClassRoomService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.classRoomService = new ClassRoomService();
  }

  public async listClasses() {
    try {
      const classes = await this.classRoomService.listClasses();
      this.res.status(201).json(classes);
    } catch (e) {
      this.next(e);
    }
  }

  public async listClassRoomById() {
    try {
      const { id } = this.req.params;
      const classRoom = await this.classRoomService.listClassRoomById(id);
      if (classRoom) {
        this.res.status(200).json(classRoom);
      } else {
        this.next(new NotFound('Class Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public createClassRoom = async () => {
    try {
      const classRoom: IClassRoom = { id: String(new mongoose.Types.ObjectId()), ...this.req.body };
      const newClassRoom = await this.classRoomService.createClassRoom(classRoom);
      this.res.status(201).json({ message: 'ClassRoom created!', id: newClassRoom });
    } catch (e) {
      this.next(e);
    }
  };

  public async updateClassRoom() {
    try {
      const { id } = this.req.params;
      const classRoom: IClassRoom = { ...this.req.body };
      const updateClasRoom = await this.classRoomService.updateClassRoom(id, classRoom);
      if (updateClasRoom) {
        this.res.status(201).json(updateClasRoom);
      } else {
        this.next(new NotFound('Class Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public async deleteClassRoom() {
    try {
      const { id } = this.req.params;
      const classFound = await this.classRoomService.deleteClassRoom(id);
      if (classFound) {
        this.res.status(200).json({ message: 'ClassRoom deleted!', id: id });
      } else {
        this.next(new NotFound('Class Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }
}

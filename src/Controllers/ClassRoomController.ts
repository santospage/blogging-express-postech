import { NextFunction, Response, Request } from 'express';
import ClassRoomService from '../Services/ClassRoomService';
import IClassRoom from '../Interfaces/IClassRoom';
import mongoose from 'mongoose';

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
    const classes = await this.classRoomService.listClasses();
    return this.res.status(201).json(classes);
  }

  public async listClassRoomById() {
    const { id } = this.req.params;
    const classRoom = await this.classRoomService.listClassRoomById(id);
    return this.res.status(201).json(classRoom);
  }

  public createClassRoom = async () => {
    const classRoom: IClassRoom = { id: String(new mongoose.Types.ObjectId()), ...this.req.body };
    const newClassRoom = await this.classRoomService.createClassRoom(classRoom);
    if (newClassRoom) {
      return this.res.status(201).json({ message: 'ClassRoom created!', id: newClassRoom });
    }
    return this.res.status(400).json({ message: 'ClassRoom is already created!', id: newClassRoom });
  };

  public async updateClassRoom() {
    const { id } = this.req.params;
    const classRoom: IClassRoom = { ...this.req.body };
    const updateClasRoom = await this.classRoomService.updateClassRoom(id, classRoom);
    return this.res.status(201).json(updateClasRoom);
  }

  public async deleteClassRoom() {
    const { id } = this.req.params;
    await this.classRoomService.deleteClassRoom(id);
    return this.res.status(200).json({ message: 'ClassRoom deleted!', id: id });
  }
}

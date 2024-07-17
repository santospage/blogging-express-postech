import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Class from '../Models/Class';

export default class ClassController {
  private res: Response;
  private req: Request;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.res = res;
    this.req = req;
    this.next = next;
  }

  public listClass = async () => {
    return Class.find()
      .populate('category')
      .then((classes) => this.res.status(200).json({ classes }))
      .catch((error) => this.res.status(500).json({ error }));
  };

  public listClassById = async () => {
    const classId = this.req.params.id;
    return Class.findById(classId)
      .populate('category')
      .then((classRoom) => (classRoom ? this.res.status(200).json({ classRoom }) : this.res.status(404).json({ message: 'Not found' })))
      .catch((error) => this.res.status(500).json({ error }));
  };

  public createClass = async () => {
    const { title, detail, date, resume, image, category } = this.req.body;
    const classRoom = new Class({
      _id: new mongoose.Types.ObjectId(),
      title,
      detail,
      date,
      resume,
      image,
      category
    });
    try {
      const classRoom_1 = await classRoom.save();
      return this.res.status(201).json({ classRoom });
    } catch (error) {
      return this.res.status(500).json({ error });
    }
  };

  public updateClass = async () => {
    const classId = this.req.params.id;
    return Class.findById(classId)
      .then((classRoom) => {
        if (classRoom) {
          classRoom.set(this.req.body);
          return classRoom
            .save()
            .then((classRoom) => this.res.status(201).json({ classRoom }))
            .catch((error) => this.res.status(500).json({ error }));
        } else {
          this.res.status(404).json({ message: 'Not found' });
        }
      })
      .catch((error) => this.res.status(500).json({ error }));
  };

  public deleteClass = async () => {
    const classId = this.req.params.id;
    return Class.findByIdAndDelete(classId)
      .then((classRoom) => (classRoom ? this.res.status(201).json({ message: 'deleted' }) : this.res.status(404).json({ message: 'Not found' })))
      .catch((error) => this.res.status(500).json({ error }));
  };
}

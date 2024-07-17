import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Class from '../models/Class';

const listClass = (req: Request, res: Response, next: NextFunction) => {
  return Class.find()
    .populate('category')
    .then((classes) => res.status(200).json({ classes }))
    .catch((error) => res.status(500).json({ error }));
};

const listClassById = (req: Request, res: Response, next: NextFunction) => {
  const classId = req.params.id;
  return Class.findById(classId)
    .populate('category')
    .then((classRoom) => (classRoom ? res.status(200).json({ classRoom }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const createClass = (req: Request, res: Response, next: NextFunction) => {
  const { title, detail, date, resume, image, category } = req.body;
  const classRoom = new Class({
    _id: new mongoose.Types.ObjectId(),
    title,
    detail,
    date,
    resume,
    image,
    category
  });
  return classRoom
    .save()
    .then((classRoom) => res.status(201).json({ classRoom }))
    .catch((error) => res.status(500).json({ error }));
};

const updateClass = (req: Request, res: Response, next: NextFunction) => {
  const classId = req.params.id;
  return Class.findById(classId)
    .then((classRoom) => {
      if (classRoom) {
        classRoom.set(req.body);
        return classRoom
          .save()
          .then((classRoom) => res.status(201).json({ classRoom }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteClass = (req: Request, res: Response, next: NextFunction) => {
  const classId = req.params.id;
  return Class.findByIdAndDelete(classId)
    .then((classRoom) => (classRoom ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { listClass, listClassById, createClass, updateClass, deleteClass };

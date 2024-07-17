import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category';

const listCategory = (req: Request, res: Response, next: NextFunction) => {
  return Category.find()
    .then((categories) => res.status(200).json({ categories }))
    .catch((error) => res.status(500).json({ error }));
};

const listCategoryById = (req: Request, res: Response, next: NextFunction) => {
  const categoryId = req.params.id;
  return Category.findById(categoryId)
    .then((category) => (category ? res.status(200).json({ category }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const createCategory = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name
  });
  return category
    .save()
    .then((category) => res.status(201).json({ category }))
    .catch((error) => res.status(500).json({ error }));
};

const updateCategory = (req: Request, res: Response, next: NextFunction) => {
  const categoryId = req.params.id;
  return Category.findById(categoryId)
    .then((category) => {
      if (category) {
        category.set(req.body);
        return category
          .save()
          .then((category) => res.status(201).json({ category }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
  const categoryId = req.params.id;
  return Category.findByIdAndDelete(categoryId)
    .then((category) => (category ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { listCategory, listCategoryById, createCategory, updateCategory, deleteCategory };

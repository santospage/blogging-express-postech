import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../Models/Category';

export default class CategoryController {
  private res: Response;
  private req: Request;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.res = res;
    this.req = req;
    this.next = next;
  }

  public listCategory = async () => {
    try {
      const categories = await Category.find();
      return this.res.status(200).json({ categories });
    } catch (error) {
      return this.res.status(500).json({ error });
    }
  };

  public listCategoryById = async () => {
    const categoryId = this.req.params.id;
    try {
      const category = await Category.findById(categoryId);
      return category ? this.res.status(200).json({ category }) : this.res.status(404).json({ message: 'Not found' });
    } catch (error) {
      return this.res.status(500).json({ error });
    }
  };

  public createCategory = async () => {
    const { name } = this.req.body;
    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      name
    });
    try {
      const category_1 = await category.save();
      return this.res.status(201).json({ category });
    } catch (error) {
      return this.res.status(500).json({ error });
    }
  };

  public updateCategory = async () => {
    const categoryId = this.req.params.id;
    return Category.findById(categoryId)
      .then((category) => {
        if (category) {
          category.set(this.req.body);
          return category
            .save()
            .then((category) => this.res.status(201).json({ category }))
            .catch((error) => this.res.status(500).json({ error }));
        } else {
          this.res.status(404).json({ message: 'Not found' });
        }
      })
      .catch((error) => this.res.status(500).json({ error }));
  };

  public deleteCategory = async () => {
    const categoryId = this.req.params.id;
    return Category.findByIdAndDelete(categoryId)
      .then((category) => (category ? this.res.status(201).json({ message: 'deleted' }) : this.res.status(404).json({ message: 'Not found' })))
      .catch((error) => this.res.status(500).json({ error }));
  };
}

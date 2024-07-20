import { NextFunction, Response, Request } from 'express';
import CategoryService from '../Services/CategoryService';
import ICategory from '../Interfaces/ICategory';
import mongoose from 'mongoose';
import NotFound from '../Errors/NotFound';

export default class CategoryController {
  private categoryService: CategoryService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.categoryService = new CategoryService();
  }

  public async listCategory(): Promise<void> {
    try {
      const categories = await this.categoryService.listCategory(this.req.query);
      this.res.status(201).json(categories);
    } catch (e) {
      this.next(e);
    }
  }

  public async listCategoryById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const categoryFound = await this.categoryService.listCategoryById(id);
      if (categoryFound) {
        this.res.status(200).json(categoryFound);
      } else {
        this.next(new NotFound('Category Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public createCategory = async (): Promise<void> => {
    try {
      const category: ICategory = { id: String(new mongoose.Types.ObjectId()), ...this.req.body };
      const newCategory = await this.categoryService.createCategory(category);
      this.res.status(201).json({ message: 'Category created!', id: newCategory });
    } catch (e) {
      this.next(e);
    }
  };

  public async updateCategory(): Promise<void> {
    try {
      const { id } = this.req.params;
      const category: ICategory = { ...this.req.body };
      const updateCategory = await this.categoryService.updateCategory(id, category);
      if (updateCategory) {
        this.res.status(201).json(updateCategory);
      } else {
        this.next(new NotFound('Category Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public async deleteCategory(): Promise<void> {
    try {
      const { id } = this.req.params;
      const categoryFound = await this.categoryService.deleteCategory(id);
      if (categoryFound) {
        this.res.status(200).json({ message: 'Category deleted!', id: id });
      } else {
        this.next(new NotFound('Category Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }
}

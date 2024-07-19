import { NextFunction, Response, Request } from 'express';
import CategoryService from '../Services/CategoryService';
import ICategory from '../Interfaces/ICategory';
import mongoose from 'mongoose';

export default class CategoryController {
  private res: Response;
  private req: Request;
  private next: NextFunction;
  private categoryService: CategoryService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.categoryService = new CategoryService();
  }

  public async listCategory() {
    const categories = await this.categoryService.listCategory();
    return this.res.status(201).json(categories);
  }

  public async listCategoryById() {
    const { id } = this.req.params;
    const category = await this.categoryService.listCategoryById(id);
    return this.res.status(201).json(category);
  }

  public createCategory = async () => {
    const category: ICategory = { id: String(new mongoose.Types.ObjectId()), name: this.req.body.name };
    const newCategory = await this.categoryService.createCategory(category);
    if (newCategory) {
      return this.res.status(201).json({ message: 'Category created!', id: newCategory });
    }
    return this.res.status(400).json({ message: 'Category is already created!', id: newCategory });
  };

  public async updateCategory() {
    const { id } = this.req.params;
    const category: ICategory = { ...this.req.body };
    const updateCategory = await this.categoryService.updateCategory(id, category);
    return this.res.status(201).json(updateCategory);
  }

  public async deleteCategory() {
    const { id } = this.req.params;
    await this.categoryService.deleteCategory(id);
    return this.res.status(200).json({ message: 'Category deleted!', id: id });
  }
}

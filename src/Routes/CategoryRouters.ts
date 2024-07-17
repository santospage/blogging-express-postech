import express from 'express';
import categoryController from '../Controllers/CategoryController';

export default class CategoryRouter {
  private router = express.Router();

  public getCategoryRouter() {
    this.router.get('/categories', (req, res, next) => new categoryController(req, res, next).listCategory());
    this.router.get('/categories/:id', (req, res, next) => new categoryController(req, res, next).listCategoryById());
    this.router.post('/categories', (req, res, next) => new categoryController(req, res, next).createCategory());
    this.router.put('/categories/:id', (req, res, next) => new categoryController(req, res, next).updateCategory());
    this.router.delete('/categories/:id', (req, res, next) => new categoryController(req, res, next).deleteCategory());

    return this.router;
  }
}

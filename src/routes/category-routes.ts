import express from 'express';
import categoryController from '../controllers/category-controller';
import userAuthorization from '../middlewares/user-authorization';

export default class CategoryRouter {
  private router = express.Router();

  public getCategoryRouter() {
    this.router.get('/categories', (req, res, next) => new categoryController(req, res, next).listCategory());
    this.router.get('/categories/:id', (req, res, next) => new categoryController(req, res, next).listCategoryById());
    this.router.post('/categories', userAuthorization, (req, res, next) => new categoryController(req, res, next).createCategory());
    this.router.put('/categories/:id', userAuthorization, (req, res, next) => new categoryController(req, res, next).updateCategory());
    this.router.delete('/categories/:id', userAuthorization, (req, res, next) => new categoryController(req, res, next).deleteCategory());

    return this.router;
  }
}

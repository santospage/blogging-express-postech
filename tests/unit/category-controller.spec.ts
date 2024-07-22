import { NextFunction, Request, Response } from 'express';
import CategoryController from '../../src/controllers/category-controller';
import CategoryService from '../../src/services/category-service';
import NotFound from '../../src/errors/not-found';

jest.mock('../../src/services/category-service');

describe('CategoryController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;
  let controller: CategoryController;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    controller = new CategoryController(req as Request, res as Response, next as NextFunction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listCategory', () => {
    it('should return a list of categories', async () => {
      const categories = [{ id: '1', name: 'category1' }];
      (CategoryService.prototype.listCategory as jest.Mock).mockResolvedValue(categories);
      req.query = {};

      await controller.listCategory();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(categories);
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (CategoryService.prototype.listCategory as jest.Mock).mockRejectedValue(error);

      await controller.listCategory();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('listCategoryById', () => {
    it('should return a category by id', async () => {
      const category = { id: '1', name: 'category1' };
      (CategoryService.prototype.listCategoryById as jest.Mock).mockResolvedValue(category);
      req.params = { id: '1' };

      await controller.listCategoryById();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(category);
    });

    it('should handle category not found', async () => {
      (CategoryService.prototype.listCategoryById as jest.Mock).mockResolvedValue(null);
      req.params = { id: '1' };

      await controller.listCategoryById();

      expect(next).toHaveBeenCalledWith(new NotFound('Category Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (CategoryService.prototype.listCategoryById as jest.Mock).mockRejectedValue(error);
      req.params = { id: '1' };

      await controller.listCategoryById();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  xdescribe('createCategory', () => {
    it('should create a new category', async () => {
      const newCategory = { id: '1', title: 'new category' };
      req.body = { title: 'new category' };
      (CategoryService.prototype.createCategory as jest.Mock).mockResolvedValue(newCategory.id);

      await controller.createCategory();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category created!', id: newCategory.id });
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (CategoryService.prototype.createCategory as jest.Mock).mockRejectedValue(error);
      req.body = { title: 'new category' };

      await controller.createCategory();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const updatedCategory = { id: '1', title: 'updated category' };
      req.params = { id: '1' };
      req.body = { title: 'updated category' };
      (CategoryService.prototype.updateCategory as jest.Mock).mockResolvedValue(updatedCategory);

      await controller.updateCategory();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(updatedCategory);
    });

    it('should handle category not found', async () => {
      req.params = { id: '1' };
      req.body = { title: 'updated category' };
      (CategoryService.prototype.updateCategory as jest.Mock).mockResolvedValue(null);

      await controller.updateCategory();

      expect(next).toHaveBeenCalledWith(new NotFound('Category Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      req.params = { id: '1' };
      req.body = { title: 'updated category' };
      (CategoryService.prototype.updateCategory as jest.Mock).mockRejectedValue(error);

      await controller.updateCategory();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      req.params = { id: '1' };
      (CategoryService.prototype.deleteCategory as jest.Mock).mockResolvedValue(true);

      await controller.deleteCategory();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted!', id: '1' });
    });

    it('should handle category not found', async () => {
      req.params = { id: '1' };
      (CategoryService.prototype.deleteCategory as jest.Mock).mockResolvedValue(false);

      await controller.deleteCategory();

      expect(next).toHaveBeenCalledWith(new NotFound('Category Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      req.params = { id: '1' };
      (CategoryService.prototype.deleteCategory as jest.Mock).mockRejectedValue(error);

      await controller.deleteCategory();

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

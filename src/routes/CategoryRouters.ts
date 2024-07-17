import express from 'express';
import categoryController from '../controllers/CategoryController';

const router = express.Router();

router.get('/categories', categoryController.listCategory);
router.get('/categories/:id', categoryController.listCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

export default router;

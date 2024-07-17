import express from 'express';
import classController from '../controllers/ClassController';

const router = express.Router();

router.get('/classes', classController.listClass);
router.get('/classes/:id', classController.listClassById);
router.post('/classes', classController.createClass);
router.put('/classes/:id', classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);

export default router;

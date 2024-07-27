import { NextFunction, Request, Response } from 'express';
import ClassRoomController from '../../src/controllers/classroom-controller';
import ClassRoomService from '../../src/services/classroom-service';
import NotFound from '../../src/errors/not-found';

jest.mock('../../src/services/classroom-service');

describe('ClassRoomController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;
  let controller: ClassRoomController;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    controller = new ClassRoomController(req as Request, res as Response, next as NextFunction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listClassRoom', () => {
    it('should return a list of classes', async () => {
      const classes = [{ id: '1', title: 'classroom1' }];
      (ClassRoomService.prototype.listClasses as jest.Mock).mockResolvedValue(classes);
      req.query = {};

      await controller.listClasses();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(classes);
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (ClassRoomService.prototype.listClasses as jest.Mock).mockRejectedValue(error);

      await controller.listClasses();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('listClassRoomManagerial', () => {
    it('should return a list of classes managerial', async () => {
      const classes = [{ id: '1', title: 'classroom1' }];
      (ClassRoomService.prototype.listClassesManagerial as jest.Mock).mockResolvedValue(classes);
      req.query = {};

      await controller.listClassesManagerial();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(classes);
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (ClassRoomService.prototype.listClassesManagerial as jest.Mock).mockRejectedValue(error);

      await controller.listClassesManagerial();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('listClassRoomById', () => {
    it('should return a classroom by id', async () => {
      const classroom = { id: '1', title: 'classes1' };
      (ClassRoomService.prototype.listClassRoomById as jest.Mock).mockResolvedValue(classroom);
      req.params = { id: '1' };

      await controller.listClassRoomById();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(classroom);
    });

    it('should handle classroom not found', async () => {
      (ClassRoomService.prototype.listClassRoomById as jest.Mock).mockResolvedValue(null);
      req.params = { id: '1' };

      await controller.listClassRoomById();

      expect(next).toHaveBeenCalledWith(new NotFound('Class Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (ClassRoomService.prototype.listClassRoomById as jest.Mock).mockRejectedValue(error);
      req.params = { id: '1' };

      await controller.listClassRoomById();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createClassRoom', () => {
    it('should create a new classroom', async () => {
      const newClassRoom = { id: '1', title: 'new classroom' };
      req.body = { title: 'new classroom' };
      (ClassRoomService.prototype.createClassRoom as jest.Mock).mockResolvedValue(newClassRoom.id);

      await controller.createClassRoom();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'ClassRoom created!', id: newClassRoom.id });
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (ClassRoomService.prototype.createClassRoom as jest.Mock).mockRejectedValue(error);
      req.body = { title: 'new classroom' };

      await controller.createClassRoom();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateClassRoom', () => {
    it('should update a classroom', async () => {
      const updatedClassRoom = { id: '1', title: 'updated classroom' };
      req.params = { id: '1' };
      req.body = { title: 'updated classroom' };
      (ClassRoomService.prototype.updateClassRoom as jest.Mock).mockResolvedValue(updatedClassRoom);

      await controller.updateClassRoom();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'ClassRoom updated!', id: updatedClassRoom });
    });

    it('should handle classroom not found', async () => {
      req.params = { id: '1' };
      req.body = { title: 'updated classroom' };
      (ClassRoomService.prototype.updateClassRoom as jest.Mock).mockResolvedValue(null);

      await controller.updateClassRoom();

      expect(next).toHaveBeenCalledWith(new NotFound('Class Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      req.params = { id: '1' };
      req.body = { title: 'updated classroom' };
      (ClassRoomService.prototype.updateClassRoom as jest.Mock).mockRejectedValue(error);

      await controller.updateClassRoom();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteClassRoom', () => {
    it('should delete a classroom', async () => {
      req.params = { id: '1' };
      (ClassRoomService.prototype.deleteClassRoom as jest.Mock).mockResolvedValue(true);

      await controller.deleteClassRoom();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'ClassRoom deleted!', id: '1' });
    });

    it('should handle classroom not found', async () => {
      req.params = { id: '1' };
      (ClassRoomService.prototype.deleteClassRoom as jest.Mock).mockResolvedValue(false);

      await controller.deleteClassRoom();

      expect(next).toHaveBeenCalledWith(new NotFound('Class Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      req.params = { id: '1' };
      (ClassRoomService.prototype.deleteClassRoom as jest.Mock).mockRejectedValue(error);

      await controller.deleteClassRoom();

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

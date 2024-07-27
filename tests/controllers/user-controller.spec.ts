import { NextFunction, Request, Response } from 'express';
import UserController from '../../src/controllers/user-controller';
import UserService from '../../src/services/user-service';
import NotFound from '../../src/errors/not-found';

jest.mock('../../src/services/user-service');

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;
  let controller: UserController;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    controller = new UserController(req as Request, res as Response, next as NextFunction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listUsers', () => {
    it('should return a list of users', async () => {
      const users = [{ id: '1', user: 'user01' }];
      (UserService.prototype.listUsers as jest.Mock).mockResolvedValue(users);
      req.query = {};

      await controller.listUsers();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (UserService.prototype.listUsers as jest.Mock).mockRejectedValue(error);

      await controller.listUsers();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('listUserById', () => {
    it('should return a user by id', async () => {
      const user = { id: '1', user: 'user01' };
      (UserService.prototype.listUserById as jest.Mock).mockResolvedValue(user);
      req.params = { id: '1' };

      await controller.listUserById();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should handle user not found', async () => {
      (UserService.prototype.listUserById as jest.Mock).mockResolvedValue(null);
      req.params = { id: '1' };

      await controller.listUserById();

      expect(next).toHaveBeenCalledWith(new NotFound('User Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (UserService.prototype.listUserById as jest.Mock).mockRejectedValue(error);
      req.params = { id: '1' };

      await controller.listUserById();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = { id: '1', user: 'user02' };
      req.body = { user: 'user02' };
      (UserService.prototype.createUser as jest.Mock).mockResolvedValue(newUser.id);

      await controller.createUser();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created!', id: newUser.id });
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      (UserService.prototype.createUser as jest.Mock).mockRejectedValue(error);
      req.body = { user: 'user02' };

      await controller.createUser();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updatedUser = { id: '1', name: 'updated user' };
      req.params = { id: '1' };
      req.body = { user: 'user02' };
      (UserService.prototype.updateUser as jest.Mock).mockResolvedValue(updatedUser);

      await controller.updateUser();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User updated!', id: updatedUser });
    });

    it('should handle user not found', async () => {
      req.params = { id: '1' };
      req.body = { user: 'user02' };
      (UserService.prototype.updateUser as jest.Mock).mockResolvedValue(null);

      await controller.updateUser();

      expect(next).toHaveBeenCalledWith(new NotFound('User Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      req.params = { id: '1' };
      req.body = { user: 'user02' };
      (UserService.prototype.updateUser as jest.Mock).mockRejectedValue(error);

      await controller.updateUser();

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      req.params = { id: '1' };
      (UserService.prototype.deleteUser as jest.Mock).mockResolvedValue(true);

      await controller.deleteUser();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted!', id: '1' });
    });

    it('should handle user not found', async () => {
      req.params = { id: '1' };
      (UserService.prototype.deleteUser as jest.Mock).mockResolvedValue(false);

      await controller.deleteUser();

      expect(next).toHaveBeenCalledWith(new NotFound('User Id not found'));
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      req.params = { id: '1' };
      (UserService.prototype.deleteUser as jest.Mock).mockRejectedValue(error);

      await controller.deleteUser();

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

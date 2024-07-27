import { NextFunction, Request, Response } from 'express';
import UserService from '../../src/services/user-service';
import NotFound from '../../src/errors/not-found';
import validUser from '../../src/utils/valid-user';
import createJwt from '../../src/utils/create-jwt';
import LoginController from '../../src/controllers/login-controller';

// Mock das dependências
jest.mock('../../src/services/user-service');
jest.mock('../../src/utils/valid-user');
jest.mock('../../src/utils/create-jwt');

describe('LoginController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let loginController: LoginController;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(() => {
    req = {
      body: {
        user: 'professor',
        password: 'testPassword'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    loginController = new LoginController(req as Request, res as Response, next as NextFunction);
    loginController['userService'] = userServiceMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should authenticate and return a JWT token for valid user', async () => {
      const { user } = req.body;
      const token = 'jwtToken';

      userServiceMock.findUser.mockResolvedValue(user);
      (validUser as jest.Mock).mockReturnValue(true);
      (createJwt as jest.Mock).mockReturnValue(token);

      await loginController.loginUser();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Authenticated user',
        token: token
      });
    });

    it('should call next with NotFound when user is not found', async () => {
      userServiceMock.findUser.mockResolvedValue(null);

      await loginController.loginUser();

      expect(next).toHaveBeenCalledWith(expect.any(NotFound));
    });

    it('should return for invalid user or password', async () => {
      const { user } = req.body;

      userServiceMock.findUser.mockResolvedValue(user);
      (validUser as jest.Mock).mockReturnValue(false);

      await loginController.loginUser();

      expect(next).toHaveBeenCalledWith(expect.any(NotFound));
    });

    it('should handle errors and call next with the error', async () => {
      const error = new Error('Test error');
      userServiceMock.findUser.mockRejectedValue(error);

      await loginController.loginUser();

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

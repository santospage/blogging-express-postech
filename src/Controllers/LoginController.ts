import { NextFunction, Response, Request } from 'express';
import UserService from '../Services/UserService';
import NotFound from '../Errors/NotFound';
import validUser from '../Utils/Validuser';
import createJwt from '../Utils/CreateJwt';

export default class LoginController {
  private userService: UserService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.userService = new UserService();
  }

  public async loginUser(): Promise<void> {
    try {
      const { user } = this.req.body;
      const userFound = await this.userService.findUser(user);
      if (userFound) {
        const userValidate = validUser(this.req.body.password, userFound);
        if (userValidate) {
          const tokenJwt = createJwt({ name: userFound.user });
          if (tokenJwt) {
            this.res.status(200).json({
              message: 'Authenticated user',
              token: tokenJwt
            });
          } else {
            this.res.status(204).json({
              message: 'Username or password is invalid'
            });
          }
        } else {
          this.res.status(204).json({
            message: 'Username or password is invalid'
          });
        }
      } else {
        this.next(new NotFound('User not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }
}

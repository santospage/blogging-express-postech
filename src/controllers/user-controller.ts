import { NextFunction, Response, Request } from 'express';
import mongoose, { Model } from 'mongoose';

import UserService from '../services/user-service';
import IUser from '../interfaces/user';
import NotFound from '../errors/not-found';

export default class UserController {
  private userService: UserService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.userService = new UserService();
  }

  public async listUsers(): Promise<void> {
    try {
      const users = await this.userService.listUsers(this.req.query);
      this.res.status(201).json(users);
    } catch (e) {
      this.next(e);
    }
  }

  public async listUserById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const user = await this.userService.listUserById(id);
      if (user) {
        this.res.status(200).json(user);
      } else {
        this.next(new NotFound('User Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public createUser = async (): Promise<void> => {
    try {
      const user: IUser = { id: new mongoose.Types.ObjectId().toString, ...this.req.body };
      const newUser = await this.userService.createUser(user);
      this.res.status(201).json({ message: 'User created!', id: newUser });
    } catch (e) {
      this.next(e);
    }
  };

  public async updateUser(): Promise<void> {
    try {
      const { id } = this.req.params;
      const user: IUser = { ...this.req.body };
      const updateUser = await this.userService.updateUser(id, user);
      if (updateUser) {
        this.res.status(201).json(updateUser);
      } else {
        this.next(new NotFound('User Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public async deleteUser(): Promise<void> {
    try {
      const { id } = this.req.params;
      const userFound = await this.userService.deleteUser(id);
      if (userFound) {
        this.res.status(200).json({ message: 'User deleted!', id: id });
      } else {
        this.next(new NotFound('User Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }
}

import IUser from '../interfaces/user';
import IParams from '../interfaces/params';
import UserModel from '../models/user-model';

export default class UserService {
  private userModel = new UserModel();

  public async listUsers(params: IParams) {
    return this.userModel.getAllUsers(params);
  }

  public async listUserById(id: string) {
    return this.userModel.getUserById(id);
  }

  public async findUser(userCode: string) {
    return this.userModel.getUserByCode(userCode);
  }

  createUser = async (user: IUser) => {
    return this.userModel.insertUser(user);
  };

  public async updateUser(id: string, user: IUser) {
    return this.userModel.updateUser(id, user);
  }

  public async deleteUser(id: string) {
    return this.userModel.deleteUser(id);
  }
}

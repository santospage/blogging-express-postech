import IUser from '../Interfaces/IUser';
import IParams from '../Interfaces/IParams';
import UserODM from '../Models/UserODM';

export default class UserService {
  private userODM = new UserODM();

  public async listUsers(params: IParams) {
    return this.userODM.getAllUsers(params);
  }

  public async listUserById(id: string) {
    return this.userODM.getUserById(id);
  }

  public async findUser(userCode: string) {
    return this.userODM.getUserByCode(userCode);
  }

  createUser = async (user: IUser) => {
    return this.userODM.insertUser(user);
  };

  public async updateUser(id: string, user: IUser) {
    return this.userODM.updateUser(id, user);
  }

  public async deleteUser(id: string) {
    return this.userODM.deleteUser(id);
  }
}

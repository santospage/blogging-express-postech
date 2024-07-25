import mongoose, { Schema, Model, models } from 'mongoose';
import IUser from '../interfaces/user';
import IParams from '../interfaces/params';
import pageDetails from '../utils/page';
import createHash from '../utils/create-hash';

export default class UserModel {
  private schema: Schema;
  private model: Model<IUser>;

  constructor() {
    this.schema = new Schema<IUser>(
      {
        user: { type: String, required: [true, 'User is required'] },
        fullName: { type: String, required: [true, 'Full Name is required'] },
        password: { type: String, required: [true, 'Password is required'] },
        salpass: { type: String },
        email: { type: String }
      },
      {
        timestamps: true,
        versionKey: false
      }
    );

    this.model = models.Users || mongoose.model('Users', this.schema);
  }

  public getModel(): Model<IUser> {
    return this.model;
  }

  public async getAllUsers(params: IParams) {
    const page = pageDetails(params);
    return await this.model
      .find()
      .sort(page.sort)
      .limit(page.pageSize)
      .skip(page.pageSize * page.page);
  }

  public async getUserById(id: string) {
    return await this.model.findById(id);
  }

  public async getUserByCode(userCode: string) {
    return await this.model.findOne({ user: userCode });
  }

  public async insertUser(user: IUser) {
    const hashPass = createHash(user.password);
    user.password = hashPass.password;
    user.salpass = hashPass.salpass;
    return await this.model.create({ ...user });
  }

  public async updateUser(id: string, user: IUser) {
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  public async deleteUser(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}

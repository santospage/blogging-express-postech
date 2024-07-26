import mongoose, { Schema } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserModel from '../../src/models/user-model';
import IUser from '../../src/interfaces/user';

describe('UserModel', () => {
  let mongoServer: MongoMemoryServer;
  let userModel: UserModel;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const userSchema = new Schema<IUser>({
      user: { type: String, required: true },
      email: { type: String, required: true, unique: true }
    });

    mongoose.model('User', userSchema);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(() => {
    userModel = new UserModel();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should get all users', async () => {
    const userData: IUser = {
      id: '123',
      user: 'Test User',
      email: 'testuser@example.com',
      fullName: 'FullName',
      password: 'password'
    };

    await userModel.insertUser(userData);

    const result = await userModel.getAllUsers({});

    expect(result.length).toBe(1);
    expect(result[0].user).toBe(userData.user);
  });

  it('should get a user by id', async () => {
    const userData: IUser = {
      id: '123',
      user: 'Test User',
      email: 'testuser@example.com',
      fullName: 'FullName',
      password: 'password'
    };

    const createdUser = await userModel.insertUser(userData);
    const result = await userModel.getUserById(createdUser._id.toString());

    expect(result).not.toBeNull();
    expect(result?.user).toBe(userData.user);
  });

  it('should insert a new user', async () => {
    const userData: IUser = {
      id: '123',
      user: 'Test User',
      email: 'testuser@example.com',
      fullName: 'FullName',
      password: 'password'
    };

    const result = await userModel.insertUser(userData);

    expect(result).not.toBeNull();
    expect(result.user).toBe(userData.user);
  });

  it('should update a user by id', async () => {
    const userData: IUser = {
      id: '123',
      user: 'Updated User',
      email: 'testuser@example.com',
      fullName: 'FullName',
      password: 'password'
    };

    const createdUser = await userModel.insertUser(userData);
    const updatedUserData = { ...userData, name: 'Updated User' };
    const result = await userModel.updateUser(createdUser._id.toString(), updatedUserData);

    expect(result).not.toBeNull();
    expect(result?.user).toBe('Updated User');
  });

  it('should delete a user by id', async () => {
    const userData: IUser = {
      id: '123',
      user: 'Test User',
      email: 'testuser@example.com',
      fullName: 'FullName',
      password: 'password'
    };

    const createdUser = await userModel.insertUser(userData);
    const result = await userModel.deleteUser(createdUser._id.toString());

    expect(result).not.toBeNull();
    expect(result?.user).toBe(userData.user);

    const findResult = await userModel.getUserById(createdUser._id.toString());
    expect(findResult).toBeNull();
  });
});

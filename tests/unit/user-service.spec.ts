import UserService from '../../src/services/user-service';
import UserModel from '../../src/models/user-model';
import IParams from '../../src/interfaces/params';

jest.mock('../../src/models/user-model', () => {
  return jest.fn().mockImplementation(() => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    getUserByCode: jest.fn(),
    insertUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
  }));
});

describe('UserService', () => {
  let userService: UserService;
  let userModelMock: jest.Mocked<UserModel>;

  beforeEach(() => {
    userModelMock = new UserModel() as jest.Mocked<UserModel>;
    userService = new UserService();
    (userService as any).userModel = userModelMock;
  });

  it('should call getAllUsers with the correct parameters', async () => {
    const params: IParams = { pageSize: '5', page: '1' };
    userModelMock.getAllUsers.mockResolvedValue([]);
    await userService.listUsers(params);
    expect(userModelMock.getAllUsers).toHaveBeenCalledWith(params);
  });

  it('should call getUserById with the correct ID', async () => {
    const id = '123';
    const mockUser = { _id: new Object(), user: 'user1' } as any;
    userModelMock.getUserById.mockResolvedValue(mockUser);
    await userService.listUserById(id);
    expect(userModelMock.getUserById).toHaveBeenCalledWith(id);
  });

  it('should call getUserByCode with the correct filter', async () => {
    const filter = 'some-filter';
    const mockUser = { _id: new Object(), user: 'user1' } as any;
    userModelMock.getUserByCode.mockResolvedValue(mockUser);
    await userService.findUser(filter);
    expect(userModelMock.getUserByCode).toHaveBeenCalledWith(filter);
  });

  it('should call insertUser with the correct user', async () => {
    const id = '123';
    const mockUser = { _id: new Object(), user: 'User' } as any;
    userModelMock.insertUser.mockResolvedValue(mockUser);
    await userService.createUser(mockUser);
    expect(userModelMock.insertUser).toHaveBeenCalledWith(mockUser);
  });

  it('should call updateUser with the correct ID and user', async () => {
    const id = '123';
    const mockUser = { _id: new Object(), user: 'User' } as any;
    userModelMock.updateUser.mockResolvedValue(mockUser);
    await userService.updateUser(id, mockUser);
    expect(userModelMock.updateUser).toHaveBeenCalledWith(id, mockUser);
  });

  it('should call deleteUser with the correct ID', async () => {
    const id = '123';
    const mockUser = { _id: new Object(), user: 'User' } as any;
    userModelMock.deleteUser.mockResolvedValue(mockUser);
    await userService.deleteUser(id);
    expect(userModelMock.deleteUser).toHaveBeenCalledWith(id);
  });
});

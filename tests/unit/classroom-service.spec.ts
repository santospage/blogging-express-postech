import ClassRoomService from '../../src/services/classroom-service';
import ClassRoomModel from '../../src/models/classroom-model';
import IParams from '../../src/interfaces/params';

jest.mock('../../src/models/classroom-model', () => {
  return jest.fn().mockImplementation(() => ({
    getAllClasses: jest.fn(),
    getClassRoomById: jest.fn(),
    getClassesByFilter: jest.fn(),
    insertClassRoom: jest.fn(),
    updateClassRoom: jest.fn(),
    deleteClassRoom: jest.fn()
  }));
});

describe('ClassRoomService', () => {
  let classRoomService: ClassRoomService;
  let classRoomModelMock: jest.Mocked<ClassRoomModel>;

  beforeEach(() => {
    classRoomModelMock = new ClassRoomModel() as jest.Mocked<ClassRoomModel>;
    classRoomService = new ClassRoomService();
    (classRoomService as any).classRoomModel = classRoomModelMock;
  });

  it('should call getAllClasses with the correct parameters', async () => {
    const params: IParams = { pageSize: '5', page: '1' };
    classRoomModelMock.getAllClasses.mockResolvedValue([]);
    await classRoomService.listClasses(params);
    expect(classRoomModelMock.getAllClasses).toHaveBeenCalledWith(params);
  });

  it('should call getClassRoomById with the correct ID', async () => {
    const id = '123';
    const mockClassRoom = { _id: new Object() } as any;
    classRoomModelMock.getClassRoomById.mockResolvedValue(mockClassRoom);
    await classRoomService.listClassRoomById(id);
    expect(classRoomModelMock.getClassRoomById).toHaveBeenCalledWith(id);
  });

  it('should call getClassesByFilter with the correct filter', async () => {
    classRoomModelMock.getClassesByFilter.mockResolvedValue([]);
    await classRoomService.listClassesByFilter({}, {});
    expect(classRoomModelMock.getClassesByFilter).toHaveBeenCalledWith({}, {});
  });

  it('should call insertClassRoom with the correct category', async () => {
    const id = '123';
    const mockClassRoom = { _id: new Object() } as any;
    classRoomModelMock.insertClassRoom.mockResolvedValue(mockClassRoom);
    await classRoomService.createClassRoom(mockClassRoom);
    expect(classRoomModelMock.insertClassRoom).toHaveBeenCalledWith(mockClassRoom);
  });

  it('should call updateClassRoom with the correct ID and category', async () => {
    const id = '123';
    const mockClassRoom = { _id: new Object() } as any;
    classRoomModelMock.updateClassRoom.mockResolvedValue(mockClassRoom);
    await classRoomService.updateClassRoom(id, mockClassRoom);
    expect(classRoomModelMock.updateClassRoom).toHaveBeenCalledWith(id, mockClassRoom);
  });

  it('should call deleteClassRoom with the correct ID', async () => {
    const id = '123';
    const mockClassRoom = { _id: new Object() } as any;
    classRoomModelMock.deleteClassRoom.mockResolvedValue(mockClassRoom);
    await classRoomService.deleteClassRoom(id);
    expect(classRoomModelMock.deleteClassRoom).toHaveBeenCalledWith(id);
  });
});

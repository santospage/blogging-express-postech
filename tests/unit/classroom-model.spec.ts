import mongoose from 'mongoose';
import ClassRoomModel from '../../src/models/classroom-model';
import IClassRoom from '../../src/interfaces/classroom';

jest.mock('mongoose', () => {
  const originalModule = jest.requireActual('mongoose');

  const mQuery = {
    populate: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    exec: jest.fn()
  };

  const mModel = {
    find: jest.fn().mockReturnValue(mQuery),
    findById: jest.fn().mockReturnValue(mQuery),
    findByIdAndUpdate: jest.fn().mockReturnValue(mQuery),
    findByIdAndDelete: jest.fn().mockReturnValue(mQuery),
    create: jest.fn()
  };

  return {
    ...originalModule,
    model: jest.fn(() => mModel),
    models: {},
    Schema: {
      Types: {
        ObjectId: jest.fn().mockImplementation(() => 'mockedObjectId')
      },
      prototype: {
        methods: {},
        statics: {}
      }
    },
    Types: {
      ObjectId: jest.fn().mockImplementation(() => 'mockedObjectId')
    }
  };
});

describe('ClassRoomModel', () => {
  let classRoomModel: ClassRoomModel;
  const mockClass: IClassRoom = {
    id: '',
    title: 'Test Class',
    detail: 'Test Detail',
    date: new Date(),
    resume: 'Test Resume',
    image: {},
    category: new mongoose.Types.ObjectId() as any,
    user: new mongoose.Types.ObjectId() as any
  };

  beforeEach(() => {
    classRoomModel = new ClassRoomModel();
  });

  xit('should get all classes', async () => {
    const params = { pageSize: '5', page: '1', ordering: '_id:1' };
    await classRoomModel.getAllClasses(params);
    expect(mongoose.model('Classes').find).toHaveBeenCalled();
  });

  xit('should get a class by id', async () => {
    const id = 'testId';
    await classRoomModel.getClassRoomById(id);
    expect(mongoose.model('Classes').findById).toHaveBeenCalledWith(id, { title: 1, detail: 1, resume: 1 });
  });

  xit('should insert a new class', async () => {
    await classRoomModel.insertClassRoom(mockClass);
    expect(mongoose.model('Classes').create).toHaveBeenCalledWith(mockClass);
  });

  xit('should update a class by id', async () => {
    const id = 'testId';
    await classRoomModel.updateClassRoom(id, mockClass);
    expect(mongoose.model('Classes').findByIdAndUpdate).toHaveBeenCalledWith(id, mockClass, { new: true });
  });

  xit('should delete a class by id', async () => {
    const id = 'testId';
    await classRoomModel.deleteClassRoom(id);
    expect(mongoose.model('Classes').findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});

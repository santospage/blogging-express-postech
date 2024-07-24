import mongoose, { Schema } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ClassRoomModel from '../../src/models/classroom-model';
import IClassRoom from '../../src/interfaces/classroom';
import IParams from '../../src/interfaces/params';

describe('ClassRoomModel', () => {
  let mongoServer: MongoMemoryServer;
  let classRoomModel: ClassRoomModel;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const categorySchema = new Schema({
      name: { type: String, required: true }
    });

    mongoose.model('Category', categorySchema);

    const classSchema = new Schema<IClassRoom>({
      title: { type: String, required: true },
      detail: { type: String, required: true },
      date: { type: Date, required: true },
      resume: { type: String, required: true },
      image: { type: Object, required: true },
      category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    });

    mongoose.model('Classes', classSchema);

    const userSchema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true }
    });

    mongoose.model('User', userSchema);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(() => {
    classRoomModel = new ClassRoomModel();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should get all classes', async () => {
    const classData: IClassRoom = {
      id: '',
      title: 'Test Class',
      detail: 'Test Detail',
      date: new Date(),
      resume: 'Test Resume',
      image: {},
      category: new mongoose.Types.ObjectId() as any,
      user: new mongoose.Types.ObjectId() as any
    };

    await classRoomModel.insertClassRoom(classData);

    const params: IParams = { pageSize: '5', page: '1' };
    const result = await classRoomModel.getAllClasses(params);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe(classData.title);
  });

  it('should get a class by id', async () => {
    const classData: IClassRoom = {
      id: '',
      title: 'Test Class',
      detail: 'Test Detail',
      date: new Date(),
      resume: 'Test Resume',
      image: {},
      category: new mongoose.Types.ObjectId() as any,
      user: new mongoose.Types.ObjectId() as any
    };

    const createdClass = await classRoomModel.insertClassRoom(classData);
    const result = await classRoomModel.getClassRoomById(createdClass._id.toString());

    expect(result).not.toBeNull();
    expect(result?.title).toBe(classData.title);
  });

  it('should insert a new class', async () => {
    const classData: IClassRoom = {
      id: '',
      title: 'New Class',
      detail: 'New Detail',
      date: new Date(),
      resume: 'New Resume',
      image: {},
      category: new mongoose.Types.ObjectId() as any,
      user: new mongoose.Types.ObjectId() as any
    };

    const result = await classRoomModel.insertClassRoom(classData);

    expect(result).not.toBeNull();
    expect(result.title).toBe(classData.title);
  });

  it('should update a class by id', async () => {
    const classData: IClassRoom = {
      id: '',
      title: 'Update Class',
      detail: 'Update Detail',
      date: new Date(),
      resume: 'Update Resume',
      image: {},
      category: new mongoose.Types.ObjectId() as any,
      user: new mongoose.Types.ObjectId() as any
    };

    const createdClass = await classRoomModel.insertClassRoom(classData);
    const updatedClassData = { ...classData, title: 'Updated Class' };
    const result = await classRoomModel.updateClassRoom(createdClass._id.toString(), updatedClassData);

    expect(result).not.toBeNull();
    expect(result?.title).toBe('Updated Class');
  });

  it('should delete a class by id', async () => {
    const classData: IClassRoom = {
      id: '',
      title: 'Delete Class',
      detail: 'Delete Detail',
      date: new Date(),
      resume: 'Delete Resume',
      image: {},
      category: new mongoose.Types.ObjectId() as any,
      user: new mongoose.Types.ObjectId() as any
    };

    const createdClass = await classRoomModel.insertClassRoom(classData);
    const result = await classRoomModel.deleteClassRoom(createdClass._id.toString());

    expect(result).not.toBeNull();
    expect(result?.title).toBe(classData.title);

    const findResult = await classRoomModel.getClassRoomById(createdClass._id.toString());
    expect(findResult).toBeNull();
  });
});

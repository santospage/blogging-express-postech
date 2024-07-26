import mongoose, { Schema } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import CategoryModel from '../../src/models/category-model';
import ICategory from '../../src/interfaces/category';
import IParams from '../../src/interfaces/params';

describe('CategoryModel', () => {
  let mongoServer: MongoMemoryServer;
  let categoryModel: CategoryModel;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const categorySchema = new Schema<ICategory>({
      name: { type: String, required: true }
    });

    mongoose.model('Category', categorySchema);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(() => {
    categoryModel = new CategoryModel();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should get all categories', async () => {
    const categoryData: ICategory = {
      id: '123',
      name: 'Test Category'
    };

    await categoryModel.insertCategory(categoryData);

    const params: IParams = { pageSize: '5', page: '1' };
    const result = await categoryModel.getAllCategories(params);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe(categoryData.name);
  });

  it('should get a category by id', async () => {
    const categoryData: ICategory = {
      id: '123',
      name: 'Test Category'
    };

    const createdCategory = await categoryModel.insertCategory(categoryData);
    const result = await categoryModel.getCategoryById(createdCategory._id.toString());

    expect(result).not.toBeNull();
    expect(result?.name).toBe(categoryData.name);
  });

  it('should insert a new category', async () => {
    const categoryData: ICategory = {
      id: '123',
      name: 'New Category'
    };

    const result = await categoryModel.insertCategory(categoryData);

    expect(result).not.toBeNull();
    expect(result.name).toBe(categoryData.name);
  });

  it('should update a category by id', async () => {
    const categoryData: ICategory = {
      id: '123',
      name: 'Update Category'
    };

    const createdCategory = await categoryModel.insertCategory(categoryData);
    const updatedCategoryData = { ...categoryData, name: 'Updated Category' };
    const result = await categoryModel.updateCategory(createdCategory._id.toString(), updatedCategoryData);

    expect(result).not.toBeNull();
    expect(result?.name).toBe('Updated Category');
  });

  it('should delete a category by id', async () => {
    const categoryData: ICategory = {
      id: '123',
      name: 'Delete Category'
    };

    const createdCategory = await categoryModel.insertCategory(categoryData);
    const result = await categoryModel.deleteCategory(createdCategory._id.toString());

    expect(result).not.toBeNull();
    expect(result?.name).toBe(categoryData.name);

    const findResult = await categoryModel.getCategoryById(createdCategory._id.toString());
    expect(findResult).toBeNull();
  });
});

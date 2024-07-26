import CategoryService from '../../src/services/category-service';
import CategoryModel from '../../src/models/category-model';
import IParams from '../../src/interfaces/params';

jest.mock('../../src/models/category-model', () => {
  return jest.fn().mockImplementation(() => ({
    getAllCategories: jest.fn(),
    getCategoryById: jest.fn(),
    getCategoryByFilter: jest.fn(),
    insertCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn()
  }));
});

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryModelMock: jest.Mocked<CategoryModel>;

  beforeEach(() => {
    categoryModelMock = new CategoryModel() as jest.Mocked<CategoryModel>;
    categoryService = new CategoryService();
    (categoryService as any).categoryODM = categoryModelMock;
  });

  it('should call getAllCategories with the correct parameters', async () => {
    const params: IParams = { pageSize: '5', page: '1' };
    categoryModelMock.getAllCategories.mockResolvedValue([]);
    await categoryService.listCategory(params);
    expect(categoryModelMock.getAllCategories).toHaveBeenCalledWith(params);
  });

  it('should call getCategoryById with the correct ID', async () => {
    const id = '123';
    const mockCategory = { _id: new Object(), name: 'Category' } as any;
    categoryModelMock.getCategoryById.mockResolvedValue(mockCategory);
    await categoryService.listCategoryById(id);
    expect(categoryModelMock.getCategoryById).toHaveBeenCalledWith(id);
  });

  it('should call getCategoryByFilter with the correct filter', async () => {
    const filter = 'portugues';
    categoryModelMock.getCategoryByFilter.mockResolvedValue([]);
    await categoryService.listCategoryByFilter(filter);
    expect(categoryModelMock.getCategoryByFilter).toHaveBeenCalledWith(filter);
  });

  it('should call insertCategory with the correct category', async () => {
    const id = '123';
    const mockCategory = { _id: new Object(), name: 'Category' } as any;
    categoryModelMock.insertCategory.mockResolvedValue(mockCategory);
    await categoryService.createCategory(mockCategory);
    expect(categoryModelMock.insertCategory).toHaveBeenCalledWith(mockCategory);
  });

  it('should call updateCategory with the correct ID and category', async () => {
    const id = '123';
    const mockCategory = { _id: new Object(), name: 'Category' } as any;
    categoryModelMock.updateCategory.mockResolvedValue(mockCategory);
    await categoryService.updateCategory(id, mockCategory);
    expect(categoryModelMock.updateCategory).toHaveBeenCalledWith(id, mockCategory);
  });

  it('should call deleteCategory with the correct ID', async () => {
    const id = '123';
    const mockCategory = { _id: new Object(), name: 'Category' } as any;
    categoryModelMock.deleteCategory.mockResolvedValue(mockCategory);
    await categoryService.deleteCategory(id);
    expect(categoryModelMock.deleteCategory).toHaveBeenCalledWith(id);
  });
});

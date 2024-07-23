import ICategory from '../interfaces/category';
import CategoryModel from '../models/category-model';
import IParams from '../interfaces/params';

export default class CategoryService {
  private categoryODM = new CategoryModel();

  public async listCategory(params: IParams) {
    return this.categoryODM.getAllCategories(params);
  }

  public async listCategoryById(id: string) {
    return this.categoryODM.getCategoryById(id);
  }

  public async listCategoryByFilter(category: string) {
    return this.categoryODM.getCategoryByFilter(category);
  }

  public async createCategory(category: ICategory) {
    return this.categoryODM.insertCategory(category);
  }

  public async updateCategory(id: string, category: ICategory) {
    return this.categoryODM.updateCategory(id, category);
  }

  public async deleteCategory(id: string) {
    return this.categoryODM.deleteCategory(id);
  }
}

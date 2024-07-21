import ICategory from '../Interfaces/ICategory';
import CategoryODM from '../Models/CategoryODM';
import IParams from '../Interfaces/IParams';

export default class CategoryService {
  private categoryODM = new CategoryODM();

  public async listCategory(params: IParams) {
    return this.categoryODM.getAllCategories(params);
  }

  public async listCategoryById(id: string) {
    return this.categoryODM.getCategoryById(id);
  }

  public async listCategoryByFilter(category: string) {
    return this.categoryODM.getCategoryByFilter(category);
  }

  createCategory = async (category: ICategory) => {
    return this.categoryODM.insertCategory(category);
  };

  public async updateCategory(id: string, category: ICategory) {
    return this.categoryODM.updateCategory(id, category);
  }

  public async deleteCategory(id: string) {
    return this.categoryODM.deleteCategory(id);
  }
}

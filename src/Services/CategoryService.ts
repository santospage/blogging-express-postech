import ICategory from '../Interfaces/ICategory';
import CategoryODM from '../Models/CategoryODM';

export default class CategoryService {
  private categoryODM = new CategoryODM();

  public async listCategory() {
    return this.categoryODM.getAllCategories();
  }

  public async listCategoryById(id: string) {
    return this.categoryODM.getCategoryById(id);
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

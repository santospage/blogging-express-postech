import ICategory from '../Interfaces/ICategory';
import CategoryODM from '../Models/CategoryODM';
import Category from '../Domains/CategoryDomain';

export default class CategoryService {
  private categoryODM = new CategoryODM();

  public async listCategory() {
    const categories = await this.categoryODM.getAllCategories();
    return categories.map((categories) => new Category(categories));
  }

  public async listCategoryById(id: string) {
    const category = await this.categoryODM.getCategoryById(id);
    if (category) return new Category(category);
    return null;
  }

  createCategory = async (category: ICategory) => {
    const categoryId = await this.categoryODM.getCategoryById(category.id);
    if (categoryId) return false;
    const newCategory = await this.categoryODM.insertCategory(category);
    return new Category(category);
  };

  public async updateCategory(id: string, category: ICategory) {
    const updateCategory = await this.categoryODM.updateCategory(id, category);
    return new Category(category);
  }

  public async deleteCategory(id: string) {
    await this.categoryODM.deleteCategory(id);
  }
}

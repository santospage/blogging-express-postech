import mongoose, { Schema, Model, models } from 'mongoose';
import ICategory from '../Interfaces/ICategory';
import IParams from '../Interfaces/IParams';
import pageDetails from '../Utils/Page';

export default class CategoryODM {
  private schema: Schema;
  private model: Model<ICategory>;

  constructor() {
    this.schema = new Schema<ICategory>(
      {
        name: { type: String, required: [true, 'Category name is required'] }
      },
      {
        timestamps: true,
        versionKey: false
      }
    );

    this.model = models.Categories || mongoose.model('Categories', this.schema);
  }

  public getModel(): Model<ICategory> {
    return this.model;
  }

  public async getAllCategories(params: IParams) {
    const page = pageDetails(params);
    return await this.model
      .find()
      .sort(page.sort)
      .limit(page.pageSize)
      .skip(page.pageSize * page.page);
  }

  public async getCategoryById(id: string) {
    return await this.model.findById(id);
  }

  public async getCategoryByFilter(category: string) {
    return await this.model.find({ name: category });
  }

  public async insertCategory(category: ICategory) {
    return await this.model.create({ ...category });
  }

  public async updateCategory(id: string, category: ICategory) {
    return await this.model.findByIdAndUpdate(id, category, { new: true });
  }

  public async deleteCategory(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}

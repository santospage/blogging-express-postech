import mongoose, { Schema, Model, model, models } from 'mongoose';
import ICategory from '../Interfaces/ICategory';

export default class CategoryODM {
  private schema: Schema;
  private model: Model<ICategory>;

  constructor() {
    this.schema = new Schema<ICategory>(
      {
        name: { type: String, required: [true, 'Category name is required'] }
      },
      {
        versionKey: false
      }
    );

    this.model = models.Categories || mongoose.model('Categories', this.schema);
  }

  public getModel(): Model<ICategory> {
    return this.model;
  }

  public async getAllCategories() {
    return await this.model.find();
  }

  public async getCategoryById(id: string) {
    return await this.model.findById(id);
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

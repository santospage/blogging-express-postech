import mongoose, { Schema, Model, model, models } from 'mongoose';
import ICategory from '../Interfaces/ICategory';

export default class CategoryODM {
  private schema: Schema;
  private model: Model<ICategory>;

  constructor() {
    this.schema = new Schema<ICategory>(
      {
        name: { type: String, required: [true, 'The category name is mandatory'] }
      },
      {
        versionKey: false,
        timestamps: true
      }
    );

    this.model = models.Categories || mongoose.model('Categories', this.schema);
  }

  public async getAllCategories() {
    const categories = await this.model.find();
    return categories;
  }

  public async getCategoryById(id: string) {
    const category = await this.model.findById(id);
    return category;
  }

  public async insertCategory(category: ICategory) {
    return this.model.create({ ...category });
  }

  public async updateCategory(id: string, category: ICategory) {
    const updateCategory = await this.model.findOneAndUpdate({ _id: id }, category, {
      new: true
    });
    return updateCategory;
  }

  public async deleteCategory(id: string) {
    await this.model.findOneAndDelete({ _id: id });
  }
}

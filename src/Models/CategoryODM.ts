import mongoose, { Schema, Model, model, models, SortOrder } from 'mongoose';
import ICategory from '../Interfaces/ICategory';
import QueryParams from '../Interfaces/IQueryParams';

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

  public async getAllCategories(params: QueryParams) {
    const { pageSize = '5', page = '1', ordering = '_id:1' } = params;
    const pageSizeNum = parseInt(pageSize);
    const pageNum = parseInt(page) - 1;
    const [sortField, sortOrder] = ordering.split(':');
    const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder === '1' ? 1 : -1 };
    return await this.model
      .find()
      .sort(sort)
      .limit(pageSizeNum)
      .skip(pageSizeNum * pageNum);
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

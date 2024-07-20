import mongoose, { Schema, Model, models, SortOrder } from 'mongoose';
import IClassRoom from '../Interfaces/IClassRoom';
import CategoryODM from './CategoryODM';
import QueryParams from '../Interfaces/IQueryParams';

export default class ClassRoomODM {
  private schema: Schema;
  private model: Model<IClassRoom>;
  private categoryODM = new CategoryODM();

  constructor() {
    this.schema = new Schema<IClassRoom>(
      {
        title: { type: String, required: [true, 'The class title is mandatory'] },
        detail: { type: String, required: [true, 'Class detail is mandatory'] },
        date: { type: Date, required: [true, 'Class date is mandatory'] },
        resume: { type: String, required: [true, 'The class summary is mandatory'] },
        image: { type: Object },
        category: { type: Schema.Types.ObjectId, ref: 'Categories' }
      },
      {
        timestamps: true,
        versionKey: false
      }
    );

    this.model = models.Classes || mongoose.model('Classes', this.schema);
    this.categoryODM.getModel();
  }

  public async getAllClasses(params: QueryParams) {
    const { pageSize = '5', page = '1', ordering = '_id:1' } = params;
    const pageSizeNum = parseInt(pageSize);
    const pageNum = parseInt(page) - 1;
    const [sortField, sortOrder] = ordering.split(':');
    const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder === '1' ? 1 : -1 };
    return await this.model
      .find({}, { title: 1, detail: 1, resume: 1 })
      .sort(sort)
      .populate('category')
      .limit(pageSizeNum)
      .skip(pageSizeNum * pageNum);
  }

  public async getAllClassesManagerial(params: QueryParams) {
    const { pageSize = '5', page = '1', ordering = '_id:1' } = params;
    const pageSizeNum = parseInt(pageSize);
    const pageNum = parseInt(page) - 1;
    const [sortField, sortOrder] = ordering.split(':');
    const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder === '1' ? 1 : -1 };
    return await this.model
      .find({})
      .sort(sort)
      .populate('category')
      .limit(pageSizeNum)
      .skip(pageSizeNum * pageNum);
  }

  public async getClassRoomById(id: string) {
    return await this.model.findById(id).populate('category');
  }

  public async getClassRoomByFilter(search: any) {
    return await this.model.find(search, { title: 1, detail: 1, resume: 1 }).populate('category');
  }

  public async insertClassRoom(classRoom: IClassRoom) {
    return await this.model.create({ ...classRoom });
  }

  public async updateClassRoom(id: string, classRoom: IClassRoom) {
    return await this.model.findByIdAndUpdate(id, classRoom, { new: true });
  }

  public async deleteClassRoom(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}

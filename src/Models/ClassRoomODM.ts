import mongoose, { Schema, Model, models } from 'mongoose';
import IClassRoom from '../Interfaces/IClassRoom';
import CategoryODM from './CategoryODM';
import IParams from '../Interfaces/IParams';
import pageDetails from '../Utils/Page';
import UserODM from './UserODM';

export default class ClassRoomODM {
  private schema: Schema;
  private model: Model<IClassRoom>;
  private categoryODM = new CategoryODM();
  private userODM = new UserODM();

  constructor() {
    this.schema = new Schema<IClassRoom>(
      {
        title: { type: String, required: [true, 'The class title is mandatory'] },
        detail: { type: String, required: [true, 'Class detail is mandatory'] },
        date: { type: Date, required: [true, 'Class date is mandatory'] },
        resume: { type: String, required: [true, 'The class summary is mandatory'] },
        image: { type: Object },
        category: { type: Schema.Types.ObjectId, ref: 'Categories' },
        user: { type: Schema.Types.ObjectId, ref: 'Users' }
      },
      {
        timestamps: true,
        versionKey: false
      }
    );

    this.model = models.Classes || mongoose.model('Classes', this.schema);
    this.categoryODM.getModel();
    this.userODM.getModel();
  }

  public async getAllClasses(params: IParams) {
    const page = pageDetails(params);
    return await this.model
      .find({}, { title: 1, detail: 1, resume: 1 })
      .sort(page.sort)
      .populate('category', 'name')
      .populate('user', 'user')
      .limit(page.pageSize)
      .skip(page.pageSize * page.page);
  }

  public async getAllClassesManagerial(params: IParams) {
    const page = pageDetails(params);
    return await this.model
      .find({})
      .sort(page.sort)
      .populate('category', 'name')
      .populate('user', 'user')
      .limit(page.pageSize)
      .skip(page.pageSize * page.page);
  }

  public async getClassRoomById(id: string) {
    return await this.model.findById(id, { title: 1, detail: 1, resume: 1 }).populate('category', 'name').populate('user', 'user');
  }

  public async getClassesByFilter(search: IParams, params: IParams) {
    const page = pageDetails(params);
    return await this.model
      .find(search, { title: 1, detail: 1, resume: 1 })
      .populate('category', 'name')
      .populate('user', 'user')
      .sort(page.sort)
      .limit(page.pageSize)
      .skip(page.pageSize * page.page);
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

import mongoose, { Schema, Model, models } from 'mongoose';
import IClassRoom from '../Interfaces/IClassRoom';
import CategoryODM from './CategoryODM';

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

  public async getAllClasses() {
    return await this.model.find().populate('category');
  }

  public async getClassRoomById(id: string) {
    return await this.model.findById(id).populate('category');
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

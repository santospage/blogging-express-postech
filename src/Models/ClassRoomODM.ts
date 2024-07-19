import mongoose, { Schema, Model, model, models } from 'mongoose';
import IClassRoom from '../Interfaces/IClassRoom';

export default class ClassRoomODM {
  private schema: Schema;
  private model: Model<IClassRoom>;

  constructor() {
    this.schema = new Schema<IClassRoom>(
      {
        title: { type: String, required: [true, 'The class title is mandatory'] },
        detail: { type: String, required: [true, 'The class detail is mandatory'] },
        date: { type: Date, required: [true, 'The class date is mandatory'] },
        resume: { type: String, required: [true, 'The class sumary of class is mandatory'] },
        image: { type: Object },
        category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' }
      },
      {
        versionKey: false,
        timestamps: true
      }
    );

    this.model = models.Classes || mongoose.model('Classes', this.schema);
  }

  public async getAllClasses() {
    const classes = await this.model.find();
    return classes;
  }

  public async getClassRoomById(id: string) {
    const classRoom = await this.model.findById(id);
    return classRoom;
  }

  public async insertClassRoom(classRoom: IClassRoom) {
    return this.model.create({ ...classRoom });
  }

  public async updateClassRoom(id: string, classRoom: IClassRoom) {
    const updateClassRoom = await this.model.findOneAndUpdate({ _id: id }, classRoom, {
      new: true
    });
    return updateClassRoom;
  }

  public async deleteClassRoom(id: string) {
    await this.model.findOneAndDelete({ _id: id });
  }
}

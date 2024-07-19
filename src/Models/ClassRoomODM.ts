import mongoose, { Schema, Model, models } from 'mongoose';
import IClassRoom from '../Interfaces/IClassRoom';
import CategoryODM from './CategoryODM';

const categoryODM = new CategoryODM();

export default class ClassRoomODM {
  private schema: Schema;
  private model: Model<IClassRoom>;

  constructor() {
    this.schema = new Schema<IClassRoom>(
      {
        title: { type: String, required: [true, 'O título da aula é obrigatório'] },
        detail: { type: String, required: [true, 'O detalhe da aula é obrigatório'] },
        date: { type: Date, required: [true, 'A data da aula é obrigatória'] },
        resume: { type: String, required: [true, 'O resumo da aula é obrigatório'] },
        image: { type: Object },
        category: { type: Schema.Types.ObjectId, ref: 'Categories' }
      },
      {
        timestamps: true,
        versionKey: false
      }
    );

    this.model = models.Classes || mongoose.model('Classes', this.schema);
  }

  public async getAllClasses() {
    const classes = await this.model.find().populate('category');
    return classes;
  }

  public async getClassRoomById(id: string) {
    const classRoom = await this.model.findById(id).populate('category');
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

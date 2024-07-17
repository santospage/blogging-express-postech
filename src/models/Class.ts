import mongoose, { Document, Schema } from 'mongoose';

export interface IClass {
  title: string;
  detail: string;
  date: Date;
  resume: string;
  image: object;
  category: string;
}

export interface IClassModel extends IClass, Document {}

const ClassSchema: Schema = new Schema(
  {
    title: { type: String, required: [true, 'The title of the class is mandatory'] },
    detail: { type: String, required: [true, 'The class detail is mandatory'] },
    date: { type: Date, default: Date.now },
    resume: { type: String, required: [true, 'The class summary is mandatory'] },
    image: { type: Object },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default mongoose.model<IClass>('Class', ClassSchema);

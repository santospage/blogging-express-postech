import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory {
  name: string;
}

export interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'The name of category is required'] }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default mongoose.model<ICategory>('Category', CategorySchema);

import { Schema, model, Document } from 'mongoose';

interface IStudent extends Document {
  name: string;
  email: string;
  grade: string;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  grade: { type: String, required: true }
});

export const Student = model<IStudent>('Student', StudentSchema);
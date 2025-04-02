import { Schema, model, Document } from 'mongoose';

interface ITeacher extends Document {
  name: string;
  email: string;
  subject: string;
}

const TeacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true }
});

export const Teacher = model<ITeacher>('Teacher', TeacherSchema);
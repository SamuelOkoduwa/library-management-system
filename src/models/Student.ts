import { Schema, model, Document, Types } from 'mongoose';

interface IStudent extends Document {
  name: string;
  email: string;
  grade: string;
  teacher: Types.ObjectId;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  grade: { type: String, required: true },
  teacher: { 
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  }
});

export const Student = model<IStudent>('Student', StudentSchema);
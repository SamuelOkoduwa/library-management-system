import { Schema, model, Document, Types } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  publishedYear: number;
  studentId?: Types.ObjectId; // Reference to Student
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student' } // Optional student reference
});

export const Book = model<IBook>('Book', BookSchema);
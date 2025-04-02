import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  publishedYear: number;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true }
});

export const Book = model<IBook>('Book', BookSchema);
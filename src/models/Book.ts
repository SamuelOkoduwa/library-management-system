import { Schema, model, Document, Types } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  publishedYear: number;
  studentId?: Types.ObjectId; // Reference to Student
}

const BookSchema = new Schema<IBook>({
  title: { 
    type: String, 
    required: 
    true 
  },
  author: { 
    type: String, 
    required: true 
  },
  publishedYear: { 
    type: Number, 
    required: true 
  },
  studentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Student' 
  }
});

export const Book = model<IBook>('Book', BookSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - publishedYear
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *         publishedYear:
 *           type: integer
 *           description: The publication year
 *         student:
 *           type: string
 *           description: ID of the student who borrowed the book
 *       example:
 *         id: 64d4f5f1b6a5f6a7f1b6a5f6
 *         title: The Great Gatsby
 *         author: F. Scott Fitzgerald
 *         publishedYear: 1925
 */
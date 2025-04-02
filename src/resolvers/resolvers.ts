import { Book } from '../models/Book';
import { Student } from '../models/Student';
import { Teacher } from '../models/Teacher';

interface BookArgs {
  title: string;
  author: string;
  publishedYear: number;
  studentId?: string;
}

interface StudentParent {
  _id: string;
}

export const resolvers = {
  Query: {
    books: async () => await Book.find().populate('studentId'),
    students: async () => await Student.find(),
    teachers: async () => await Teacher.find()
  },
  Mutation: {
    addBook: async (_: never, args: BookArgs) => {
      const book = new Book(args);
      return await book.save();
    }
  },
  Student: {
    books: async (parent: StudentParent) => await Book.find({ studentId: parent._id })
  }
};
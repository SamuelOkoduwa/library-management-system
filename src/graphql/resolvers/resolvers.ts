import { Book } from '../../models/Book';
import { Student } from '../../models/Student';
import { Teacher } from '../../models/Teacher';
import { graphqlCache } from '../cache/cache';

// Define interfaces for resolver arguments
interface BookArgs {
  id: string;
  title?: string;
  author?: string;
  publishedYear?: number;
  studentId?: string;
}

interface StudentArgs {
  teacherId: string;
}

interface AssignBookArgs {
  bookId: string;
  studentId: string;
}

interface ResolverParent {
  _id: string;
  teacher: string;
}

export const resolvers = {
  Query: {
    books: graphqlCache(async () => await Book.find().populate('student'), 'all-books'),
    book: async (_: unknown, { id }: { id: string }) => 
      await Book.findById(id).populate('student'),
    booksByStudent: async (_: unknown, { studentId }: { studentId: string }) => 
      await Book.find({ student: studentId }),
    
    students: graphqlCache(async () => await Student.find().populate('teacher'), 'all-students'),
    studentsByTeacher: async (_: unknown, { teacherId }: StudentArgs) => 
      await Student.find({ teacher: teacherId }),
    
    teachers: graphqlCache(async () => await Teacher.find(), 'all-teachers')
  },
  Mutation: {
    createBook: async (_: unknown, args: BookArgs) => {
      const book = new Book(args);
      await book.save();
      return book.populate('student');
    },
    updateBook: async (_: unknown, { id, ...args }: BookArgs) => {
      return await Book.findByIdAndUpdate(id, args, { new: true }).populate('student');
    },
    deleteBook: async (_: unknown, { id }: { id: string }) => {
      return await Book.findByIdAndDelete(id);
    },
    assignBookToStudent: async (_: unknown, { bookId, studentId }: AssignBookArgs) => {
      return await Book.findByIdAndUpdate(
        bookId, 
        { student: studentId }, 
        { new: true }
      ).populate('student');
    }
  },
  Student: {
    books: async (parent: ResolverParent) => 
      await Book.find({ student: parent._id }),
    teacher: async (parent: ResolverParent) => 
      await Teacher.findById(parent.teacher)
  },
  Teacher: {
    students: async (parent: ResolverParent) => 
      await Student.find({ teacher: parent._id })
  }
};
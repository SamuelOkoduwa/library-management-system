import { Request, Response } from 'express';
import { Book } from '../../../models/Book';

// Get a single book
const getABook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id).populate('studentId');
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};

export default getABook;
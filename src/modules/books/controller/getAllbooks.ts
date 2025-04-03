import {Request, Response} from 'express';
import {Book} from '../../../models/Book';

const getAllBooks = async (req: Request, res: Response)  => {
	try {
	  const books = await Book.find().populate('studentId');
	  const bookCount = await Book.countDocuments();
	  res.json({
		status: true,
		TotalBooks: bookCount,
		AllBooks: books
	});
	} catch (error) {
	  res.status(500).json({ message: 'Error fetching books' });
	}
};  

export default getAllBooks;
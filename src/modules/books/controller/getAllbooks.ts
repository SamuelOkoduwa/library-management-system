import {Request, Response} from 'express';
import {Book} from '../../../models/Book';

const getAllBooks = async (req: Request, res: Response)  => {
	try {
	  const books = await Book.find();
	  res.json(books);
	} catch (error) {
	  res.status(500).json({ message: 'Error fetching books' });
	}
};  

export default getAllBooks;
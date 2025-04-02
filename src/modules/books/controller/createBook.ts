import {Request, Response} from 'express';
import { Book } from '../../../models/Book';

const createBook = async (req: Request, res: Response) => {
	try {
	  const { title, author, publishedYear } = req.body;
	  const newBook = new Book({ title, author, publishedYear });
	  await newBook.save();
	  res.status(201).json(newBook);
	} catch (error) {
	  console.error('Book creation error:', error);
	  res.status(400).json({ 
		message: 'Error creating book',
		error: error instanceof Error ? error.message : 'Unknown error'
	  });
	}
}

export default createBook;
import {Request, Response} from 'express';
import { Book } from '../../../models/Book';

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishedYear
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: number
 *               studentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Book already exists or invalid input
 */

const createBook = async (req: Request, res: Response): Promise<void> => {
	try {
		const { title, author, publishedYear, studentId } = req.body;

		// Check for existing book with same title and author
		const existingBook = await Book.findOne({ 
			title: { $regex: new RegExp(`^${title}$`, 'i') }, // Case-insensitive match
			author: { $regex: new RegExp(`^${author}$`, 'i') }
		});

		if (existingBook) {
			res.status(400).json({
				status: false,
				message: 'Book with this title and author already exists'
			});
			return;
		}

		const newBook = new Book({ 
			title, 
			author, 
			publishedYear,
			studentId
		});
		await newBook.save();

		res.status(201).json({
			status: true,
			newBook: newBook
		});
	} catch (error) {
		console.error('Book creation error:', error);
		res.status(400).json({ 
			status: false,
			message: 'Error creating book',
			error: error instanceof Error ? error.message : 'Unknown error'
		});
	}
};

export default createBook;
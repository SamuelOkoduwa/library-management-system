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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 newBook:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid input
 */

const createBook = async (req: Request, res: Response) => {
	try {
	  const { title, author, publishedYear, studentId } = req.body;
	  const newBook = new Book({ 
		title, author, publishedYear 
	});
	  await newBook.save();
	  res.status(201).json({
		status: true,
		newBook: newBook
	});
	} catch (error) {
	  console.error('Book creation error:', error);
	  res.status(400).json({ 
		message: 'Error creating book',
		error: error instanceof Error ? error.message : 'Unknown error'
	  });
	}
}

export default createBook;
import {Request, Response} from 'express';
import {Book} from '../../../models/Book';


/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

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
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Book title
 *         author:
 *           type: string
 *           description: Book author
 *         publishedYear:
 *           type: number
 *           description: Year of publication
 *         studentId:
 *           type: string
 *           description: ID of student who borrowed the book
 */

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 TotalBooks:
 *                   type: number
 *                 AllBooks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */

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
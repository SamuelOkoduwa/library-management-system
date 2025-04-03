import { Request, Response } from "express";
import { Book } from "../../../models/Book";

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 updatedBook:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book not found
 */

// Update a book
const UpdateABook =  async (req: Request, res: Response) => {
	try {
	  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
	  res.json({
		status: true,updatedBook: updatedBook
	});
	} catch (error) {
	  res.status(400).json({  message: error instanceof Error ? error.message : 'An error occurred' });
	}
};

export default UpdateABook;
import { Request, Response } from "express";
import { Book } from "../../../models/Book";

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
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
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Book not found
 */

// Delete a book
const deleteBook =  async (req: Request, res: Response) => {
	try {
	  await Book.findByIdAndDelete(req.params.id);
	  res.json({ message: 'Book deleted' });
	} catch (err) {
	  res.status(500).json({ message: 'Failed to delete book' });
	}
  };

  export default deleteBook
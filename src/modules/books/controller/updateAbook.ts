import { Request, Response } from "express";
import { Book } from "../../../models/Book";

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
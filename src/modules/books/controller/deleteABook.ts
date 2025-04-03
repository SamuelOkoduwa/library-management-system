import { Request, Response } from "express";
import { Book } from "../../../models/Book";

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
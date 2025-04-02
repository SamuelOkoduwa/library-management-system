import express from 'express';
import getAllBooks from '../controller/getAllbooks';
import createBook from '../controller/createBook';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/create', createBook);

export default router;
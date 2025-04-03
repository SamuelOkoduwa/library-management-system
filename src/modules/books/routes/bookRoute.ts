import { Router } from 'express';
import getAllBooks from '../controller/getAllbooks';
import createBook from '../controller/createBook';
import { cache } from '../../../middlewares/cache';
import getABook from '../controller/getABook';
import UpdateABook from '../controller/updateAbook';
import deleteBook from '../controller/deleteABook';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getABook);
router.post('/create', createBook);
router.put('/:id', UpdateABook);
router.delete('/:id', deleteBook);

export default router;
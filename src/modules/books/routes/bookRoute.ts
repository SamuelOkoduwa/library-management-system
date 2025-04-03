import { Router } from 'express';
import getAllBooks from '../controller/getAllbooks';
import createBook from '../controller/createBook';
import { cache } from '../../../middlewares/cache';
import getABook from '../controller/getABook';
import UpdateABook from '../controller/updateAbook';
import deleteBook from '../controller/deleteABook';
import { auth } from '../../../middlewares/auth';

const router = Router();

router.get('/', auth, getAllBooks);
router.get('/:id', auth, getABook);
router.post('/create', auth, createBook);
router.put('/:id', auth, UpdateABook);
router.delete('/:id', auth, deleteBook);

export default router;
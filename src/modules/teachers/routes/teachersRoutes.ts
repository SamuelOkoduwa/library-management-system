import { Router } from 'express';
import getTeachers from '../controller/getteachers';
import getTeacherStudents from '../controller/getTeacherStudents';
// import { cache } from '../../../middlewares/cache';
// import { auth } from '../../../middlewares/auth';

const router = Router();

router.get('/',  getTeachers);
router.get('/:teacherId/students', getTeacherStudents);


// router.get('/', cache('all-teachers'), getTeachers);
// router.get('/:teacherId/students', cache('teacher-students'), getTeacherStudents);

export default router;
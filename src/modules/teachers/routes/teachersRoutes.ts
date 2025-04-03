import { Router } from 'express';
import getTeachers from '../controller/getteachers';
import getTeacherStudents from '../controller/getTeacherStudents';
import { auth } from '../../../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /api/v1/teachers/{teacherId}/students:
 *   get:
 *     summary: Get all students for a specific teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *         description: The teacher's ID
 *     responses:
 *       200:
 *         description: List of students for the teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Server error
 */
router.get('/:teacherId/students', auth, getTeacherStudents);
router.get('/', auth, getTeachers);

// router.get('/', cache('all-teachers'), getTeachers);
// router.get('/:teacherId/students', cache('teacher-students'), getTeacherStudents);

export default router;
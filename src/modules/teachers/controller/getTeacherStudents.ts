import { Request, Response } from 'express';
import { Student } from '../../../models/Student';

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Student's name
 *         email:
 *           type: string
 *           description: Student's email
 *         teacher:
 *           type: string
 *           description: Teacher's ID
 */

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
 *         description: Teacher's ID
 *     responses:
 *       200:
 *         description: List of students for the teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Server error
 */
const getTeacherStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find({ teacher: req.params.teacherId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};

export default getTeacherStudents;
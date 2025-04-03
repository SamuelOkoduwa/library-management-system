import { Request, Response } from 'express';
import { Student } from '../../../models/Student';
import { Teacher } from '../../../models/Teacher';
import mongoose from 'mongoose';

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
    const teacherId = req.params.teacherId;
    console.log('Searching for teacher ID:', teacherId);

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid teacher ID format',
      });
      return;
    }

    const teacher = await Teacher.findById(teacherId);
    console.log('Found teacher:', teacher);

    if (!teacher) {
      res.status(404).json({
        status: false,
        message: 'Teacher not found',
      });
      return;
    }

    // Querying students with ObjectId
    const students = await Student.find({
      teacher: new mongoose.Types.ObjectId(teacherId),
    }).lean();

    console.log('Students retrieved:', students);

    if (!students.length) {
      res.status(200).json({
        status: true,
        message: 'No students found for this teacher',
        students: [],
      });
      return;
    }

    res.json({
      status: true,
      students: students,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error fetching students',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export default getTeacherStudents;

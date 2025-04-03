import { Request, Response } from 'express';
import { Student } from '../../../models/Student';

const getTeacherStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find({ teacher: req.params.teacherId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};

export default getTeacherStudents;
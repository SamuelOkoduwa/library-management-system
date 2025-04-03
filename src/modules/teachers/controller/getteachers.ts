import { Request, Response } from 'express';
import { Teacher } from '../../../models/Teacher';

const getTeachers = async (req: Request, res: Response): Promise<void> => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers' });
  }
};

export default getTeachers;
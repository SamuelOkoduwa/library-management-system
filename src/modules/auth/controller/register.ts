import jwt from 'jsonwebtoken';
import {Request, Response} from 'express'
import { User } from '../../../models/User';

// Register
const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role });
    await user.save();
    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user' });
  }
};

export default register
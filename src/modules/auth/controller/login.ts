import { Request, Response } from "express";
import { User } from "../../../models/User";
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
	  const user = await User.findOne({ email });
	  if (!user || !(await user.comparePassword(password))) {
		return res.status(401).json({ message: 'Invalid credentials' });
	  }
	  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
	  res.json({ token });
	} catch (error) {
	  res.status(500).json({ message: 'Server error' });
	}
  };
  
export default login
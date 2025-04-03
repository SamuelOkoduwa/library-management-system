import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Add interface to extend Request
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const auth = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { id: string; role: string };
    
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
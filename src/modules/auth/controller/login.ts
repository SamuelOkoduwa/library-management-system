import { Request, Response } from "express";
import { User } from "../../../models/User";
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   description: User's email
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;
	console.log(req.body);
	
	try {
	  const user = await User.findOne({ email });
	  if (!user || !(await user.comparePassword(password))) {
		res.status(401).json({ message: 'Invalid credentials' });
		return;
	  }
	  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
	  res.json({
		user: user.email,
		token: token 
	});
	} catch (error) {
	  res.status(500).json({ 
		status: false,
		message: 'Server error' 
	});
	}
  };
  
export default login
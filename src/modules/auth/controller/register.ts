import jwt from 'jsonwebtoken';
import {Request, Response} from 'express'
import { User } from '../../../models/User';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid input or user already exists
 */

// Register
const register = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password, role } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      res.status(400).json({
        status: false,
        message: "User already exists"
      });
      return;
    }

    // Create new user - Fix: await the creation and remove save()
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password, 
      role 
    });

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Fix: use _id instead of id
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      status: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      status: false,
      message: error instanceof Error ? error.message : 'Error creating user'
    });
  }
};

export default register
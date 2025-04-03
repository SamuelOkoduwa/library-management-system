import { body } from 'express-validator';

export const bookValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedYear').isInt({ min: 1000, max: new Date().getFullYear() })
];
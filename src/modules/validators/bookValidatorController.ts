import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
// import { bookValidationRules } from './validators/bookValidator';

const valid =  (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	  return res.status(400).json({ errors: errors.array() });
	}
	// Proceed if validation passes
}

export default valid
import express from 'express';
import {auth } from '../../middlewares/auth';
import { bookValidationRules } from './bookValidator';
import valid from './bookValidatorController';

const router = express.Router()
// router.post('/api/books', auth, bookValidationRules, valid);
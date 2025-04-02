import express, { Request, Response } from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 4000;

// Connect DB
connectDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Library Management System is running!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
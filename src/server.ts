import express, { Request, Response } from 'express';
import connectDB from './config/db';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

// Initialization of express app
const app = express();

app.use(express.json());
app.use(morgan('tiny'));


// Connect DB
connectDB()

app.get('/api/v1/', (req: Request, res: Response) => {
  res.send('Library Management System is running!');
});

// Book API
import bookRoute from './modules/books/routes/bookRoute';
app.use('/api/v1/books', bookRoute);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
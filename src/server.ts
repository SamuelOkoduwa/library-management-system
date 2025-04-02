import express, { Application, Request, Response } from 'express';
import connectDB from './config/db';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/schema';
import { resolvers } from './resolvers/resolvers';
import morgan from 'morgan';
import dotenv from 'dotenv';

import bookRoute from './modules/books/routes/bookRoute';
import { errorHandler } from './middlewares/errorHandler';


dotenv.config();

// Initialization of express app
const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));


// Connect DB
connectDB()

app.get('/api/v1/', (req: Request, res: Response) => {
  res.send('Library Management System is running!');
});

// Book API
app.use('/api/v1/books', bookRoute);


// Apollo Server (GraphQL)
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }) => ({ req }) // Optional: for future auth
});


app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 4000;
async function startServer() {
  await server.start();
  server.applyMiddleware({ app: app as any }); // Type assertion to resolve compatibility issue
  
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`REST API: http://localhost:${PORT}/api/books`);
    console.log(`GraphQL: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
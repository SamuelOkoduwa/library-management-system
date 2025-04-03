import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'API for managing books, students and teachers',
    },
    servers: [
      {
        url: 'http://localhost:6500/api/v1',
      },
      {
        url: 'https://library-management-system-mxof.onrender.com/api/v1',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // apis: ['./src/routes/*.ts', './src/models/*.ts'],
  apis: ['./src/modules/books/controller/*.ts', './src/modules/books/teacher/*.ts'], // Include user controller path
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
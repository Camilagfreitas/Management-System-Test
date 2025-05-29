import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task BFF API',
      version: '1.0.0',
      description: 'API do BFF para gerenciamento de tarefas',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123' },
            email: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'secret123' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'abc-123' },
            userId: { type: 'string', example: 'user-456' },
            title: { type: 'string', example: 'New task' },
            description: { type: 'string', example: 'Task details here' },
            status: { type: 'string', example: 'pending' },
            category: { type: 'string', example: 'work' },
            priority: { type: 'string', example: 'high' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/docs/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

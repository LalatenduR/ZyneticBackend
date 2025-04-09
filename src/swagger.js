import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ZyneticBackend API',
      version: '1.0.0',
      description: 'API documentation for ZyneticBackend (Auth + Books)',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: [`${__dirname}/routes/*.js`],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

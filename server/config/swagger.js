const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MediCare AI - Master Healthcare Ecosystem API',
      version: '1.0.0',
      description: 'Comprehensive REST APIs for Telemedicine, Pharmacy, Lab Diagnostics, Electronic Health Records, and AI Services',
      contact: { name: 'MediCare AI Engineering', email: 'support@medicare.ai' }
    },
    servers: [{ url: 'http://localhost:5000/api', description: 'Development Server' }]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };

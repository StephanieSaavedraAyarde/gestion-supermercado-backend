const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.yml'
const endpointsFiles = ['./main.js']

swaggerAutogen(outputFile, endpointsFiles)
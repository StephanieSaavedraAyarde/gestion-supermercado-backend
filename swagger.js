const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.yml'
const endpointsFiles = ['./ventas.js']

swaggerAutogen(outputFile, endpointsFiles)
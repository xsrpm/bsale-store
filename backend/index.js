require('dotenv').config()
const express = require('express')
const cors = require('cors')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const mysqlConnection = require('./db-connection.js')
const sqlInjection = require('sql-injection')
const path = require('path')

const app = express()

//swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BSale API Test Documentation',
      version: '1.0.0',
      description: 'Documentación de la API de Bsale Store',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/'
      }
    },
    servers: [
      {
        url: `${process.env.BASE_URL}`
      }
    ]
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`]
}

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(cors())
app.use(express.static('../frontend/'))
app.use(sqlInjection)
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerSpec))
)

// Routes
app.use(productRouter(mysqlConnection))
app.use(categoryRouter(mysqlConnection))
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message
  })
})

// Starting the server
const server = app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')} 🚀`)
})

// Closing the server
process.on('SIGTERM', function () {
  server.close(function () {
    console.log('Closed out remaining connections.')
    mysqlConnection.end()
  })

  setTimeout(function () {
    console.error(
      'Could not close connections in time, forcefully shutting down'
    )
    process.exit(1)
  }, 30 * 1000)
})

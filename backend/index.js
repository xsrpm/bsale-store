require('dotenv').config()
const express = require('express')
const cors = require('cors')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const mysqlConnection = require('./db-connection.js')

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(cors())
app.use(express.static('../frontend/'))

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
  console.log(`Server on port ${app.get('port')}`)
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

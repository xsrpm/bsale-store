require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json())
app.use(cors())
app.use(express.static('../frontend/'))
// Routes
const mysqlConnection = require('./db-connection.js')

app.use(productRouter(mysqlConnection))
app.use(categoryRouter(mysqlConnection))

// Starting the server
const server = app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})

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

const express = require('express')
const router = express.Router()

function categoryRoutes(mysqlConnection) {
  router.get('/category', (req, res) => {
    mysqlConnection.query('SELECT * FROM category', (err, rows, fields) => {
      if (!err) {
        res.json(rows)
      } else {
        console.log(err)
      }
    })
  })
  return router
}

module.exports = categoryRoutes

const express = require('express')
const router = express.Router()

/**
 * This function returns a router object that has a route that returns all the categories in the
 * database
 * @param mysqlConnection - The connection to the MySQL database.
 * @returns A router object.
 */
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

const express = require('express')
const router = express.Router()

function categoryRoutes(mysqlConnection) {
  router.get('/category', (req, res) => {
    /*
    mysqlConnection.query('SELECT * FROM category', (err, rows, fields) => {
      if (!err) {
        res.json(rows)
      } else {
        console.log(err)
      }
    })
*/
    res.json([
      {
        id: 1,
        name: 'bebida energetica'
      },
      {
        id: 2,
        name: 'pisco'
      },
      {
        id: 3,
        name: 'ron'
      },
      {
        id: 4,
        name: 'bebida'
      },
      {
        id: 5,
        name: 'snack'
      },
      {
        id: 6,
        name: 'cerveza'
      },
      {
        id: 7,
        name: 'vodka'
      }
    ])
  })
  return router
}

module.exports = categoryRoutes

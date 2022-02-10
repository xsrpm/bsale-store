const express = require('express')
const { validate } = require('../helper/validate')
const { categoryId, search } = require('../validations/product')
const router = express.Router()

/**
 * Get all products from the database and return them as JSON
 * @param mysqlConnection - The connection to the database.
 * @returns A router object.
 */
function productsRoutes(mysqlConnection) {
  router.get('/product', (req, res) => {
    mysqlConnection.query('SELECT * FROM product', (err, rows, fields) => {
      if (!err) {
        res.json(rows)
      } else {
        console.log(err)
      }
    })
  })

  router.get('/product/category/:catId', validate(categoryId), (req, res) => {
    const { catId } = req.params
    mysqlConnection.query(
      `SELECT p.id,p.name,p.url_image,p.price,p.discount,c.id AS category_id, c.name AS category_name FROM product p JOIN category c ON p.category=c.id WHERE c.id=${parseInt(
        catId
      )}`,
      (err, rows, fields) => {
        if (!err) {
          res.json(rows)
        } else {
          console.log(err)
        }
      }
    )
  })

  router.get('/product/search/:search', validate(search), (req, res) => {
    const { search } = req.params
    const { categoryId, orderByPrice } = req.query
    let searchQuery = `SELECT p.id,p.name,p.url_image,p.price,p.discount,c.id AS category_id, c.name AS category_name FROM product p JOIN category c ON p.category=c.id AND p.name LIKE '%${search}%'`
    if (categoryId) {
      searchQuery += ` AND c.id=${categoryId}`
    }
    if (orderByPrice) {
      searchQuery += ` ORDER BY p.price ${orderByPrice}`
    }
    console.log(searchQuery)

    mysqlConnection.query(searchQuery, (err, rows, fields) => {
      if (!err) {
        res.json(rows)
      } else {
        console.log(err)
      }
    })
  })

  return router
}

module.exports = productsRoutes

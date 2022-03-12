const express = require('express')
const { validate } = require('../helper/validate')
const { categoryId, search } = require('../validations/product')
const router = express.Router()
const openConnection = require('../openConnection')

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The id of the product
 *          required: true
 *        name:
 *          type: string
 *          description: The name of the product
 *          required: true
 *        url_image:
 *          type: string
 *          description: The url of the product image
 *          required: true
 *        price:
 *          type: number
 *          description: The price of the product
 *          required: true
 *        discount:
 *          type: number
 *          description: The discount of the product
 *          required: false
 *        category:
 *          type: number
 *          description: The id of the category of the product
 *          required: true
 *      example:
 *        id: 1
 *        name: Product 1
 *        url_image: https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
 *        price: 10
 *        discount: 5
 *        category: 1
 */

/**
 * Get all products from the database and return them as JSON
 * @returns A router object.
 */
function productsRoutes() {
  /**
   * @swagger
   * /products:
   *  get:
   *   description: Returns all the products in the database
   *   tags: [Product]
   *   responses:
   *    '200':
   *     description: A list of products in the database
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *          $ref: '#/components/schemas/Product'
   */

  router.get('/products', (req, res) => {
    const con = openConnection()
    con.query('SELECT * FROM product', (err, rows, fields) => {
      if (!err) {
        res.json(rows)
      } else {
        console.log(err)
      }
    })
    con.end()
  })

  /**
   * @swagger
   * /products/categories/{catId}:
   *  get:
   *   description: Returns all the products in the database
   *   tags: [Product]
   *   parameters:
   *    - in: path
   *      name: catId
   *      schema:
   *        type: integer
   *      description: The id of the category
   *      required: true
   *   responses:
   *    '200':
   *     description: A list of products of the category x in the database
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *          $ref: '#/components/schemas/Product'
   *   '404':
   *      description: The category with the id x does not exist
   */

  router.get(
    '/products/categories/:catId',
    validate(categoryId),
    (req, res) => {
      const { catId } = req.params
      const con = openConnection()
      con.query(
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
      con.end()
    }
  )

  /**
   * @swagger
   * /products/search/{search}:
   *  get:
   *   description: Returns all the products in the database for a search
   *   tags: [Product]
   *   parameters:
   *    - in: path
   *      name: search
   *      schema:
   *        type: string
   *      description: The name or part of the name of the product
   *      required: true
   *   responses:
   *    '200':
   *     description: A list of products with the name/part of name sended in the database
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *          $ref: '#/components/schemas/Product'
   *   '404':
   *      description: Don't exist products with the name/part of name sended
   */

  router.get('/products/search/:search', validate(search), (req, res) => {
    const { search } = req.params
    const { categoryId, orderByPrice } = req.query
    let searchQuery = `SELECT p.id,p.name,p.url_image,p.price,p.discount,c.id AS category_id, c.name AS category_name FROM product p JOIN category c ON p.category=c.id WHERE p.name LIKE '%${search}%'`
    if (categoryId) {
      searchQuery += ` AND c.id=${categoryId}`
    }
    if (orderByPrice) {
      searchQuery += ` ORDER BY p.price ${orderByPrice}`
    }
    console.log(searchQuery)
    const con = openConnection()
    con.query(searchQuery, (err, rows, fields) => {
      if (!err) {
        res.json(rows)
      } else {
        console.log(err)
      }
    })
    con.end()
  })

  return router
}

module.exports = productsRoutes

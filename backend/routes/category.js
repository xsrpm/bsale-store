const express = require('express')
const router = express.Router()
const openConnection = require('../openConnection')

/**
 * This function returns a router object that has a route that returns all the categories in the
 * database
 * @returns A router object.
 */
function categoryRoutes() {
  /**
   * @swagger
   * components:
   *  schemas:
   *    Category:
   *      type: object
   *      properties:
   *        id:
   *          type: integer
   *          description: The id of the category
   *          required: true
   *        name:
   *          type: string
   *          description: The name of the category
   *          required: true
   *      example:
   *        id: 1
   *        name: Category 1
   */

  /**
   * @swagger
   * /categories:
   *  get:
   *   description: Returns all the categories in the database
   *   tags: [Category]
   *   responses:
   *    '200':
   *     description: A list of categories  in the database
   *     content:
   *      application/json:
   *       schema:
   *        type: array
   *        items:
   *          $ref: '#/components/schemas/Category'
   */

  router.get('/categories', (req, res) => {
    const con = openConnection()
    con.query('SELECT * FROM category', (err, rows, fields) => {
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

module.exports = categoryRoutes

const express = require('express')
const router = express.Router()

/**
 * This function returns a router object that has a route that returns all the categories in the
 * database
 * @param mysqlConnection - The connection to the MySQL database.
 * @returns A router object.
 */
function categoryRoutes(mysqlConnection) {
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

/**
 * This function takes a validation function as an argument and returns a function that takes a request
 * and a response object as arguments.
 *
 * The returned function calls the validation function with the request object and throws an error if
 * the validation function returns an error.
 *
 * If the validation function doesn't throw an error, the returned function calls the next function in
 * the middleware chain.
 * @param validation - The validation function that will be run against the request.
 * @returns A middleware function.
 */
function validate(validation) {
  return (req, res, next) => {
    try {
      validation(req)
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  validate
}

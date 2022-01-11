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

const yup = require('yup')

function categoryId(req) {
  const schema = yup.object().shape({
    catId: yup.number().positive().required()
  })

  schema.validateSync(req.params)
}

function search(req) {
  const schemaParams = yup.object().shape({
    search: yup.string().required()
  })

  schemaParams.validateSync(req.params)

  const schemaQuery = yup.object().shape({
    categoryId: yup.number().positive(),
    orderByPrice: yup.string().oneOf(['ASC', 'DESC'])
  })

  schemaQuery.validateSync(req.query)
}

module.exports = {
  categoryId,
  search
}

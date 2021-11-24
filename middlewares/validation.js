const validation = (schema) => {
  const contactValidation = (req, _, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      error.status = 400
      next(error)
    }
    next()
  }
  return contactValidation
}

module.exports = validation

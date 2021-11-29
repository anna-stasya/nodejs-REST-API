const validation = require('./validation')
const controllerWrapper = require('./controllerWrapper')
const authenticate = require('./authenticate')
const uploadMiddelewares = require('./uploadMiddelewares')

module.exports = {
  validation,
  controllerWrapper,
  authenticate,
  uploadMiddelewares
}

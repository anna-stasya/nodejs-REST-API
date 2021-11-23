const express = require('express')

const { joiSchema } = require('../../model/Schemas/user')
const { validation, authenticate, controllerWrapper } = require('../../middelevwares')

const {
  signup,
  login,
  logout
} = require('../../controllers/auth')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(signup))
router.post('/login', validation(joiSchema), controllerWrapper(login))
router.post('/logout', authenticate, validation(joiSchema), controllerWrapper(logout))

module.exports = router
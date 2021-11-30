const express = require('express')

const { joiSchema } = require('../../model/Schemas/user')
const { validation, authenticate, uploadMiddelewares, controllerWrapper } = require('../../middlewares')

const {
  signup,
  login,
  logout,
  current,
  avatars
} = require('../../controllers/auth')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(signup))
router.post('/login', validation(joiSchema), controllerWrapper(login))
router.post('/logout', authenticate, validation(joiSchema), controllerWrapper(logout))
router.get('/current', authenticate, validation(joiSchema), controllerWrapper(current))
router.patch('/avatars', authenticate, uploadMiddelewares.single('avatar'), controllerWrapper(avatars))

module.exports = router

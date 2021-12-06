const { BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = require('../../model/Schemas/user')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user.verify) {
    throw new BadRequest('Sorry, you have not verified your email')
  }

  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong')
  }

  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token
    },
    message: 'User is login',
    user: {
      email: `${email}`,
      subscription: 'starter'
    },
  })
}

module.exports = login

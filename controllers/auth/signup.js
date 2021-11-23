const { Conflict } = require('http-errors')
const { User } = require('../../model/Schemas/user')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }
  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email: newUser.email,
      subscription: 'starter'
    },
  })
}

module.exports = signup

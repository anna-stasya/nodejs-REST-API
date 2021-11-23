// const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')
const { User } = require('../../model/Schemas/user')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`Email ${email} in use`)
    // res.status(409).json({
    //   status: 'conflict',
    //   code: 409,
    //   message: `Email ${email} in use`
    // })
    // return
  }
  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()
  // const salt = bcrypt.genSaltSync(10)
  // const hashPassword = bcrypt.hashSync(password, salt)
  // const newUser = await User.create({ email, password: hashPassword })
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

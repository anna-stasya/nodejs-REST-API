const { Conflict } = require('http-errors')
const path = require('path')
const fs = require('fs/promises')
const gravatar = require('gravatar')

const { User } = require('../../model/Schemas/user')

const contactsDir = path.join(__dirname, '../../public/avatars')

const signup = async (req, res) => {
  const { email, password } = req.body

  const avatarURL = gravatar.url(email)
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }
  const newUser = new User({ email, avatarURL })
  newUser.setPassword(password)
  await newUser.save()

  const avatarFolder = path.join(contactsDir, String(newUser._id))
  await fs.mkdir(avatarFolder)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      // user: {
      //   email: newUser.email,
      //   subscription: 'starter',
      //   avatarURL: newUser.avatarURL

      // },
      user: {
        email,
        subscription: 'starter',
      },
    }
  })
}

module.exports = signup

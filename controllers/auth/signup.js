const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const path = require('path')
const fs = require('fs/promises')
const gravatar = require('gravatar')

const { User } = require('../../model/Schemas/user')
const sendMail = require('../../utils/sendMail')

const contactsDir = path.join(__dirname, '../../public/avatars')

const signup = async (req, res) => {
  const { email, password } = req.body

  const avatarURL = gravatar.url(email, { protocol: 'https', s: '250' })
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }
  const verificationToken = nanoid()
  const newUser = new User({ email, avatarURL, verificationToken })

  newUser.setPassword(password)

  await newUser.save()

  const mail = {
    to: email,
    from: 'sanatar.nastya@gmail.com',
    subject: 'registration confirmed',
    html: `<a href='http://localhost:3000/api/auth/verify/${verificationToken}'> Сlick to confirm email</a>`
  }
  await sendMail(mail)

  const avatarFolder = path.join(contactsDir, String(newUser._id))

  await fs.mkdir(avatarFolder)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    data: {
      user: {
        email: newUser.email,
        subscription: 'starter',
        avatarURL: newUser.avatarURL

      },
    }
  })
}

module.exports = signup

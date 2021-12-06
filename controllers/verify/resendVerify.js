const { NotFound, BadRequest } = require('http-errors')

const { User } = require('../../model/Schemas/user')
const sendMail = require('../../utils/sendMail')

const resendVerify = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound('User not found')
  }
  if (user.verificationToken) {
    throw new BadRequest('Verification has already been passed')
  }

  const mail = {
    to: email,
    subject: 'registration confirmed',
    html: `<a href='http://localhost:3000/api/auth/verify/${user.verificationToken}'> Сlick to confirm email</a>`
  }
  await sendMail(mail)

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = resendVerify

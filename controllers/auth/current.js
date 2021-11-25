const { Unauthorized } = require('http-errors')
const { User } = require('../../model/Schemas/user')

const current = async (req, res) => {
  const { _id } = req.user
  const { body } = req

  const currentUser = await User.findById(_id, body)

  if (!currentUser) {
    throw new Unauthorized('Not authorized2')
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      email: currentUser.email,
      subscription: 'starter',
    },
  })
}

module.exports = current

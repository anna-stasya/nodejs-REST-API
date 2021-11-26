
const { User } = require('../../model/Schemas/user')

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json()
}

module.exports = logout

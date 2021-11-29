const { Unauthorized } = require('http-errors')
const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const { User } = require('../../model/Schemas/user')

const userDir = path.join(__dirname, '../../public/avatars')

const avatars = async (req, res, next) => {
//   if (!req.file) {
//     return next(new BadRequest('Error upload file'))
//   }
  // const id = String(req.user._id)
  const { _id } = req.user
  const { path: tempUpload, originalname } = req.file

  try {
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(userDir, String(_id), filename)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('/avatars', String(_id), filename)

    await Jimp.read(resultUpload)
      .then(image => { image.resize(250, 250).write(resultUpload) })
      .catch(err => { console.error(err) })

    const updateAvatar = await User.findOneAndUpdate(
      _id,
      { avatarURL },
      { new: true },
    )

    if (!updateAvatar) {
      throw new Unauthorized('Not authorized')
    }

    res.json({
      status: 'success',
      code: 200,
      avatarURL: {
        updateAvatar
      }
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error
  }
}

module.exports = avatars

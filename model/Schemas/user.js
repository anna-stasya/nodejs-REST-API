const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

// ---------------------Schema---------------------
const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
    required: true
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true })

// ---------------------hash---------------------
userSchema.methods.setPassword = function (password) {
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(password, salt)
}

// ---------------------compare---------------------
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}
// ---------------------Joi---------------------
const joiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().case('lower').valid('starter', 'pro', 'business'),
  token: Joi.string(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}

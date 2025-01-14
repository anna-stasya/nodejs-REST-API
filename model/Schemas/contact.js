const { Schema, model } = require('mongoose')
const Joi = require('joi')

const codeRegexp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    match: codeRegexp,
    require: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(codeRegexp, 'phone').required(),
  favorite: Joi.boolean(),
})

const joiSchemaUpdate = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
}).or('name', 'email', 'phone')

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
  joiSchemaUpdate
}

const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID__API_KEY } = process.env

sgMail.setApiKey(SENDGRID__API_KEY)

const sendMail = async (data) => {
  const email = { ...data, from: 'sanatar.nastya@gmail.com' }
  await sgMail.send(email)
  return true
}

module.exports = sendMail

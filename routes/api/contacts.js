const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const { joiSchema, joiSchemaUpdate } = require('../../model/Schemas/contact')
const { authenticate } = require('../../middlewares')

const {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
} = require('../../model/contacts')

const router = express.Router()

// ----------------------GET listContacts-----------------------
router.get('/', authenticate, async (req, res, next) => {
  try {
    const userId = req.user._id
    const contacts = await listContacts(userId, req.query)

    res.json({
      status: 'success',
      code: 200,
      message: 'Contacts found',
      data: {
        contacts
      },
    })
  } catch (error) {
    next(error)
  }
})

// ---------------------- GET getContactById---------------
router.get('/:contactId', authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params
    const userId = req.user._id
    const result = await getContactsById(contactId, userId)
    if (!result) {
      throw new NotFound('Contacts not found')
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Get contacts by id',
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------POST addContact----------------------
router.post('/', authenticate, async (req, res, next) => {
  try {
    const userId = req.user._id
    const newContact = { ...req.body, owner: userId }
    const { error } = await joiSchema.validate(req.body)

    if (error) {
      throw new BadRequest('Missing required name field')
    }
    const result = await addContact(newContact)
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Add new contact',
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------DELETE removeContact-----------------
router.delete('/:contactId', authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params
    const userId = req.user._id

    const result = await removeContact(contactId, userId)
    if (!result) {
      throw new NotFound(`Contacts whith id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: `Contact whith id=${contactId} deleted `,
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------PUT updateContactById-------------------
router.put('/:contactId', authenticate, async (req, res, next) => {
  try {
    const { error } = joiSchemaUpdate.validate(req.body)
    if (error) {
      throw new BadRequest('Missing field favorite')
    }
    const { contactId } = req.params
    const userId = req.user._id
    const result = await updateContactById(contactId, req.body, userId)
    if (!result) {
      throw new NotFound('Not found')
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Update contact',
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------PATCH favorite-------------------
router.patch('/:contactId/favorite', authenticate, async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (!error) {
      throw new BadRequest('Missing field favorite')
    }
    const { contactId } = req.params
    const { favorite } = req.body
    const userId = req.user._id
    const result = await updateStatusContact(contactId, { favorite }, userId)

    if (!result) {
      throw new NotFound('Contact not found')
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Update status contact',
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router

const { Contact } = require('./Schemas/contact')
// =======================================list============================
const listContacts = async (userId, page = '1', limit = '15') => {
  const result = await Contact.find({ owner: userId },
    '_id name email phone favorite',
    { page, limit })
    .populate('owner', '_id email')
  return result
}

// =====================================get================================
const getContactsById = async (contactId, userId) => {
  const result = await Contact.findById(contactId, userId)
  if (!result) {
    return null
  }
  return result
}

// =====================================add================================
const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

// =====================================update by id================================
const updateContactById = async (contactId, body, userId) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

// =====================================remove================================
const removeContact = async (contactId, userId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId, owner: userId })
  if (result === -1) {
    return null
  }
  return result
}

// =====================================favorite================================
const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return result
}

module.exports = {
  listContacts,
  getContactsById,
  addContact,
  updateContactById,
  removeContact,
  updateStatusContact,
}

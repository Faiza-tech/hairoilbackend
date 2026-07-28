const Contact = require("../models/contactModel");

const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json(contact);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getContacts = async (req, res) => {
  try {

    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(contacts);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

module.exports = {
  createContact,
  getContacts,
};
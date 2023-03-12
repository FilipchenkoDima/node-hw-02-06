const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  refurbishContact,
} = require("../../controllers/contactControllers");
const {
  postContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router()

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", postContactValidation, createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContactValidation, refurbishContact);

module.exports = router

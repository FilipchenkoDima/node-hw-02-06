const express = require("express");
const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  refurbishContact,
  updateStatusContact,
} = require("../../controllers/contactControllers");
const {
  postContactValidation,
  putContactValidation,
  patchFavoriteValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", postContactValidation, createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContactValidation, refurbishContact);

router.patch(
  "/:contactId/favorite",
  patchFavoriteValidation,
  updateStatusContact
);

module.exports = router;

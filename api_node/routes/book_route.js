const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book_controller");
const validation = require("./../utilities/validation");
const upload = require("../utilities/uploading");
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.validationBookById, validation, bookController.getBookById);
router.get(
  "/s/:title",
  bookController.getBookByTitleValidation,
  validation,
  bookController.getBookByTitle
);
router.get("/top/rate", bookController.getTopBooks);
router.post(
  "/n/create",
  upload.single("cover"),
  bookController.createNewBookValidation,
  validation,
  bookController.createNewBook
);
router.post(
  "/n/update/:id",
  upload.single("cover"),
  bookController.validationBookById,
  validation,
  bookController.updateBook
);

router.delete("/:id", bookController.deleteBookValidation, validation, bookController.deleteBook);

// router.post('')
module.exports = router;

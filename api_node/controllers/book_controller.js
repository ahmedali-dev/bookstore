const { param, body } = require("express-validator");
const books = require("./../db/books");
const fs = require("fs");
const path = require("path");
const { ApiError } = require("../utilities/ApiError");
const uuid = require("crypto").randomUUID;
// get all books
const getAllBooks = async (req, res, next) => {
  const { page = 1 } = req.query;
  const limit = 20;
  try {
    const { id } = req.user;
    const booksList = await books.getAllBooks(page, limit, "where b.user_id = ?", [id]);
    res.status(200).json(booksList);
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const getTopBooks = async (req, res, next) => {
  try {
    const topBooks = await books.topBooksRated();
    res.status(200).json(topBooks);
  } catch (error) {
    console.log("🚀 ~ getTopBooks ~ error:", error);
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const validationBookById = [
  param("id").isString().isLength({ min: 1 }).withMessage("id is required"),
];
const getBookById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await books.getBookById("where b.id = ?", [id]);
    res.status(200).json(book);
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};
const getBookByTitleValidation = [
  param("title").isString().isLength({ min: 1 }).withMessage("title is required"),
];
const getBookByTitle = async (req, res, next) => {
  const { page = 1, type = "s" } = req.query;
  const limit = 20;
  const { id } = req.user;
  const { title } = req.params;
  try {
    let where = "LIKE b.title ?";
    let params = [`%${title}%`];
    if (type === "s") {
      where = "where b.user_id = ? and b.title LIKE ?";
      params = [id, `%${title}%`];
    }
    const book = await books.getAllBooks(page, limit, where, params);

    res.status(200).json(book);
  } catch (error) {
    console.log("🚀 ~ getBookByTitle ~ error:", error);
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const createNewBookValidation = [
  body("title").isString().isLength({ min: 8, max: 256 }).withMessage("title is required"),
  body("category_id").isString().isLength({ min: 1 }).withMessage("category_id is required"),
  body("description").isString().isLength({ min: 50 }).withMessage("description is required"),
  body("price").isDecimal().withMessage("price is required"),
  body("count").isInt().withMessage("count is required"),
];

const createNewBookValidationForCover = async (req, res, next) => {
  next();
};
const createNewBook = async (req, res, next) => {
  const { title, category_id, description, price, count } = req.body;
  const { id: user_id } = req.user;
  const id = uuid();
  const cover = req.file;
  console.log("🚀 ~ createNewBook ~ cover:", cover);

  if (!cover) {
    next(ApiError.customError(400, "Cover is required"));
  }

  try {
    const newBook = {
      id,
      title,
      category_id,
      description,
      price,
      count,
      cover: cover.filename,
      user_id,
    };

    const book = await books.createNewBook(newBook);
    if (book.affectedRows) {
      console.log(book.insertId);
      const newBook = await books.getBookById("where b.id = ? and b.user_id = ?", [
        book.insertId,
        user_id,
      ]);
    }
    res.status(201).json(newBook);
  } catch (error) {
    console.log("🚀 ~ createNewBook ~ error:", error);
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const updateBook = async (req, res, next) => {
  const { id } = req.params;
  let update = req.body;
  const file = req.file;

  try {
    const bookFromDb = await books.getBookById("where b.id = ? and b.user_id = ?", [
      id,
      req.user.id,
    ]);

    if (bookFromDb.length === 0) {
      return next(ApiError.customError(404, "Book not found"));
    }
    if (file) {
      update = { ...update, cover: file.filename };
    } else {
      update = { ...update, cover: bookFromDb[0].cover };
    }

    const newBook = { ...bookFromDb[0], ...update };

    const book = await books.updateBook(newBook);
    const ex = book.affectedRows && newBook.cover !== bookFromDb[0].cover;

    if (ex) {
      const filePath = path.join(__dirname, "..", "images", bookFromDb[0].cover);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => console.log(err));
      }
    }
    const UpdatedBook = await books.getBookById("where b.id = ? and b.user_id = ?", [
      id,
      req.user.id,
    ]);
    res.status(200).json(UpdatedBook);
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};

// delete book
const deleteBookValidation = [
  param("id").isString().isLength({ min: 1 }).withMessage("id is required"),
];
const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  const { id: user_id } = req.user;

  try {
    const book = await books.deleteBook(id, user_id);

    res.status(200).json(id);
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};

module.exports = {
  getAllBooks,
  validationBookById,
  getBookById,
  getBookByTitleValidation,
  getBookByTitle,
  createNewBookValidation,
  createNewBookValidationForCover,
  createNewBook,
  getTopBooks,
  updateBook,
  deleteBookValidation,
  deleteBook,
};

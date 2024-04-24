const { param, body } = require("express-validator");
const books = require("./../db/books");
const fs = require("fs");
const path = require("path");
// get all books
const getAllBooks = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const { id } = req.user;
    const booksList = await books.getAllBooks("*", page, limit, "where books.user_id = ?", [id]);
    res.status(200).json(booksList);
  } catch (error) {
    console.log("🚀 ~ getAllBooks ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getBookByIdValidation = [
  param("id").isString().isLength({ min: 1 }).withMessage("id is required"),
];
const getBookById = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ getBookById ~ id:", id);
  try {
    const book = await books.getBookById(id, "*");
    res.status(200).json(book);
  } catch (error) {
    console.log("🚀 ~ getBookById ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};
const getBookByTitleValidation = [
  param("title").isString().isLength({ min: 1 }).withMessage("title is required"),
];
const getBookByTitle = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const { id } = req.user;
  const { title } = req.params;
  console.log("🚀 ~ getBookByTitle ~ title:", title);
  try {
    const book = await books.getAllBooks(
      "*",
      page,
      limit,
      "where books.user_id = ? AND books.title LIKE ?",
      [id, `%${title}%`]
    );
    res.status(200).json(book);
  } catch (error) {
    console.log("🚀 ~ getBookByTitle ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

const searchForBookUseingTitleanduseridValidation = [
  param("title").isString().isLength({ min: 1 }).withMessage("title is required"),
];
// const searchForBookUseingTitleanduserid = async (req, res) => {
//   const { page = 1, limit = 20 } = req.query;
//   const { id } = req.user;
//   const { title } = req.params;
//   try{
//     const booksList = await getAllBooks("*", page, limit, "where books.user_id = ? AND books.title LIKE ?", [id, `%${title}%`]);
//     res.status(200).json(booksList);
//   }catch(error){
//     console.log("🚀 ~ searchForBookUseingTitleanduserid ~ error:", error)
//     res.status(500).json({ error: error.message });
// }

const createNewBookValidation = [
  body("title").isString().isLength({ min: 8, max: 256 }).withMessage("title is required"),
  body("category_id").isString().isLength({ min: 1 }).withMessage("category_id is required"),
  body("description").isString().isLength({ min: 50 }).withMessage("discription is required"),
  body("price").isDecimal().withMessage("price is required"),
  body("count").isInt().withMessage("count is required"),
];

const createNewBookValidationForCover = async (req, res, next) => {
  next();
};
const createNewBook = async (req, res) => {
  const { title, category_id, description, price, count } = req.body;
  const { id } = req.user;
  const cover = req.file;

  if (!cover) {
    return res.status(400).json({ error: "cover is required" });
  }
  console.log("🚀 ~ createNewBook ~ cover:", cover);
  const newBook = {
    title,
    category_id,
    description,
    price,
    count,
    cover: cover.filename,
    user_id: id,
  };
  console.log("🚀 ~ createNewBook ~ newBook:", newBook);
  try {
    const book = await books.createNewBook(newBook);
    res.status(201).json({ affectedRows: book.affectedRows });
  } catch (error) {
    console.log("🚀 ~ createNewBook ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

// update book
// const updateBookValidation = [
//   param("id").isString().isLength({ min: 1 }).withMessage("id is required"),
// ];
// const updateBook = async (req, res) => {
//   const { id } = req.params;
//   console.log("🚀 ~ updateBook ~ id:", id);
//   const update = req.body;
//   if (req.file) {
//     console.log(req.file);
//     update.cover = req.file.filename;
//   }
//   console.log("🚀 ~ updateBook ~ update:", update);
//   try {
//     // getbook by id and marge the update send from user
//     const bookFromDb = await books.getBookById(id);
//     console.log("🚀 ~ updateBook ~ bookFromDb:", bookFromDb);
//     if (bookFromDb.length === 0) {
//       return res.status(404).json({ error: "book not found" });
//     }
//     const newBook = { ...bookFromDb[0], ...update };
//     console.log("🚀 ~ updateBook ~ newBook:", newBook);
//     const book = await books.updateBook(newBook);
//     if (book.affectedRows) {
//       const filePath = path.join(__dirname, "..", "images", bookFromDb.cover);
//       console.log("🚀 ~ updateBook ~ filePath:", filePath);
//       console.log("here", filePath);
//       //   fs.unlink(filePath, (err) => {
//       //     if (err) {
//       //       console.log("🚀 ~ updateBook ~ err:", err);
//       //       return res.status(500).json({ error: err.message });
//       //     }
//       //   });
//     }
//     res.status(200).json({ affectedRows: book.affectedRows });
//   } catch (error) {
//     console.log("🚀 ~ updateBook ~ error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const updateBookValidation = [
  param("id").isString().isLength({ min: 1 }).withMessage("id is required"),
];

// const updateBook = async (req, res) => {
//   const { id } = req.params;
//   console.log("🚀 ~ updateBook ~ id:", id);
//   const update = req.body;

//   console.log("🚀 ~ updateBook ~ update:", update);
//   try {
//     const bookFromDb = await books.getBookById(id);
//     console.log("🚀 ~ updateBook ~ bookFromDb:", bookFromDb);
//     if (bookFromDb.length === 0) {
//       return res.status(404).json({ error: "book not found" });
//     }
//     if (req.file) {
//       console.log(req.file);
//       update.cover = req.file.filename; // Corrected property name
//     }
//     console.dir("🚀 ~ updateBook ~ file:", req.file);
//     return res.status(200).json({ cover: update.cover });
//     const newBook = { ...bookFromDb[0], ...update };
//     console.log("🚀 ~ updateBook ~ newBook:", newBook);
//     const book = await books.updateBook(newBook);
//     if (book.affectedRows && bookFromDb[0].cover && req.file.filename) {
//       const filePath = path.join(__dirname, "..", "images", bookFromDb[0].cover);
//       console.log("🚀 ~ updateBook ~ filePath:", filePath);
//       if (fs.existsSync(filePath)) {
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.log("🚀 ~ updateBook ~ err:", err);
//             return res.status(500).json({ error: err.message });
//           }
//         });
//       }
//     }
//     res.status(200).json({ affectedRows: book.affectedRows });
//   } catch (error) {
//     console.log("🚀 ~ updateBook ~ error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const updateBook = async (req, res) => {
  const { id } = req.params;
  let update = req.body;
  const file = req.file;
  console.log("🚀 ~ updateBook ~ file:", file);
  console.log("🚀 ~ updateBook ~ id:", id);
  console.log("🚀 ~ updateBook ~ update:", update);
  try {
    const bookFromDb = await books.getBookById(id);

    if (bookFromDb.length === 0) {
      return res.status(404).json({ error: "book not found" });
    }
    if (file) {
      update = { ...update, cover: file.filename };
    } else {
      update = { ...update, cover: bookFromDb[0].cover };
    }

    const newBook = { ...bookFromDb[0], ...update };
    console.log("🚀 ~ updateBook ~ newBook:", newBook);
    const book = await books.updateBook(newBook);
    const ex = newBook.cover !== bookFromDb[0].cover;
    console.log("🚀 ~ updateBook ~ ex:", ex);
    if (book.affectedRows && newBook.cover !== bookFromDb[0].cover) {
      const filePath = path.join(__dirname, "..", "images", bookFromDb[0].cover);

      console.log("🚀 ~ updateBook ~ filePath:", filePath);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("🚀 ~ updateBook ~ err:", err);
            return res.status(500).json({ error: err.message });
          }
        });
      }
    }
    const UpdatedBook = await books.getBookById(id);
    res.status(200).json({ UpdatedBook, affectedRows: book.affectedRows });
  } catch (error) {
    console.log("🚀 ~ updateBook ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

// delete book
const deleteBookValidation = [
  param("id").isString().isLength({ min: 1 }).withMessage("id is required"),
];
const deleteBook = async (req, res) => {
  const { id } = req.params;
  const { id: user_id } = req.user;
  console.log("🚀 ~ deleteBook ~ id:", id);
  try {
    const book = await books.deleteBook(id, user_id);
    console.log("🚀 ~ book:", book);
    res.status(200).json({ id, affectedRows: book.affectedRows });
  } catch (error) {
    console.log("🚀 ~ deleteBook ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookByIdValidation,
  getBookById,
  getBookByTitleValidation,
  getBookByTitle,
  createNewBookValidation,
  createNewBookValidationForCover,
  createNewBook,
  updateBookValidation,
  updateBook,
  deleteBookValidation,
  deleteBook,
};

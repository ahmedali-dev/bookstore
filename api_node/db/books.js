const connection = require("./connect");
const crypto = require("crypto");

const getAllBooks = async (select = "*", page = 1, pageSize = 10, where = "", params = []) => {
  const offset = (page - 1) * pageSize;
  // Ensure the SQL placeholders and `where` clause are correctly concatenated and placed.
  const sql = `SELECT books.${select}, users.username, categorys.name as cateName FROM books JOIN users ON books.user_id = users.id JOIN categorys ON books.category_id = categorys.id ${where} LIMIT ? OFFSET ?`;
  const [results] = await connection.query(sql, [...params, pageSize, offset]);
  return results;
};

// Usage example
// const books = await getAllBooks("*", 2, 10);
const getBookByTitle = async (title, page = 1, pageSize = 10) => {
  const searchTerm = `%${title}%`;
  // Correct usage of `getAllBooks` by providing proper parameters and the `WHERE` clause.
  const results = await getAllBooks("*", page, pageSize, "WHERE books.title LIKE ?", [searchTerm]);
  return results;
};

const getBookById = async (id, select = "*") => {
  const sql = `SELECT books.${select}, users.username, categorys.name as cateName FROM books join users on books.user_id = users.id join categorys on books.category_id = categorys.id WHERE books.id = ?`;
  const [results] = await connection.query(sql, [id]);
  return results;
};

const createNewBook = async (book) => {
  const { user_id, category_id, cover, title, description, price, count } = book;
  const id = crypto.randomUUID();
  const sql = `insert into books(id,user_id,category_id, cover,title,description,price,count) values (?,?,?,?,?,?,?,?)`;
  const [result] = await connection.query(sql, [
    id,
    user_id,
    category_id,
    cover,
    title,
    description,
    price,
    count,
  ]);
  return result;
};

const updateBook = async (book) => {
  const { id, category_id, cover, title, description, price, count, rating } = book;
  const sql = `  UPDATE books SET category_id = ?, cover = ?, title = ?, description = ?, price = ?, count = ?, rating = ?, updated = now() WHERE id = ?`;
  const [result] = await connection.query(sql, [
    category_id,
    cover,
    title,
    description,
    price,
    count,
    rating,
    id,
  ]);
  return result;
};

const deleteBook = async (id, user_id) => {
  const sql = `delete from books where id=? and user_id=?`;
  const [result] = await connection.query(sql, [id, user_id]);
  return result;
};

module.exports = {
  getAllBooks,
  getBookById,
  getBookByTitle,
  createNewBook,
  updateBook,
  deleteBook,
};

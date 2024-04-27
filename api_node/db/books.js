const connection = require("./connect");
const crypto = require("crypto");

const BASE_SQL = `
  SELECT 
    b.*,
    u.username,
    c.name as cateName,
    COUNT(r.id) as reviewCount,
    ROUND(AVG(r.rating)) as avgRating
  FROM 
    books b
  LEFT JOIN 
    reviews r ON b.id = r.book_id
  JOIN 
    users u ON b.user_id = u.id
  JOIN 
    categorys c ON b.category_id = c.id
`;
const getAllBooks = async (page = 1, pageSize = 20, where = "", params = []) => {
  const offset = (page - 1) * pageSize;
  // Ensure the SQL placeholders and `where` clause are correctly concatenated and placed.
  // let sql = `SELECT books.${select}, users.username, categorys.name as cateName FROM books JOIN users ON books.user_id = users.id JOIN categorys ON books.category_id = categorys.id ${where} LIMIT ? OFFSET ?`;
  // sql =
  //   "select b.*, u.username, c.name as cateName, count(r.id) as reviewCount, round(avg(r.rating)) as avgRating";

  let sql = `${BASE_SQL} ${where} GROUP BY b.id order by b.updated desc limit ? offset ? `;
  const [results] = await connection.query(sql, [...params, pageSize, offset]);

  return results;
};

const topBooksRated = async () => {
  const sql = `${BASE_SQL} GROUP BY b.id order by avgRating desc limit 30`;
  const [results] = await connection.query(sql);
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

const getBookById = async (where = "", params = []) => {
  const sql = `${BASE_SQL} ${where}`;

  const [results] = await connection.query(sql, params);
  return results;
};

const createNewBook = async (book) => {
  const { id, user_id, category_id, cover, title, description, price, count } = book;
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
  topBooksRated,
};

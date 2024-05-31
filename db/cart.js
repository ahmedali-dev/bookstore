/**
 * 
 * -- DROP TABLE IF EXISTS cart;
-- CREATE TABLE IF NOT EXISTS cart (
--     `id` VARCHAR(256) PRIMARY KEY DEFAULT MD5(CONCAT(RAND(), NOW())),
--     `user_id` VARCHAR(256) NOT NULL,
--     `book_id` VARCHAR(256) NOT NULL,
--     `count` INT DEFAULT 0,
--     `created` TIMESTAMP DEFAULT NOW(),
--     `updated` TIMESTAMP DEFAULT NOW(),
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (book_id) REFERENCES books(id)
-- );
 */

const connection = require("./connect");
const uuid = require("crypto").randomUUID;

const addToCart = async (data) => {
  const { user_id, book_id, count } = data;
  const id = uuid();
  const sql = "INSERT INTO cart (id,user_id,book_id,count) VALUES (?,?,?,?)";
  const [result] = await connection.execute(sql, [id, user_id, book_id, count]);
  return result;
};

const getCartById = async (user_id, book_id) => {
  const sql = "SELECT count(id) as found FROM cart  WHERE user_id = ? AND book_id = ?";
  const [result] = await connection.execute(sql, [user_id, book_id]);
  return result;
};

const getCart = async (user_id, book_id = null) => {
  let sql =
    "SELECT c.*, b.cover, b.title, b.price,b.count as book_count FROM cart c join books b on c.book_id = b.id WHERE c.user_id = ?";
  let params = [user_id];
  if (book_id) {
    console.log("🚀 ~ getCart ~ book_id:", book_id);
    sql += " AND c.id = ?";
    params.push(book_id);
  }

  const [result] = await connection.execute(sql, params);
  return result;
};

const deleteAllCart = async (user_id) => {
  const sql = "DELETE FROM cart WHERE user_id = ?";
  const [result] = await connection.execute(sql, [user_id]);
  return result;
};

const deleteCart = async (user_id, id) => {
  const sql = "DELETE FROM cart WHERE user_id = ? AND id = ?";
  const [result] = await connection.execute(sql, [user_id, id]);
  return result;
};

const updateCart = async (data) => {
  const { user_id, book_id, count } = data;
  // check cart count if equal to 0 then delete from cart
  if (count === 0) {
    return deleteCart(user_id, book_id);
  }
  const sql = "UPDATE cart SET `count` = ? WHERE user_id = ? AND id = ?";
  const [result] = await connection.execute(sql, [count, user_id, book_id]);
  return result;
};

module.exports = { addToCart, getCartById, getCart, updateCart, deleteCart, deleteAllCart };

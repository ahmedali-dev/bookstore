const connection = require("./connect");
const randomUUID = require("crypto").randomUUID;

const getReviews = async (select, where, data) => {
  const sql = `
      SELECT 
        reviews.${select}, 
        users.username, 
        users.avatar 
      FROM 
        reviews 
        JOIN users ON reviews.user_id = users.id 
      ${where}`;
  const [result] = await connection.execute(sql, data);
  return result;
};

const addReview = async (data) => {
  const { user_id, book_id, rating, review } = data;
  const id = randomUUID();
  const sql = "INSERT INTO reviews (id,user_id,book_id,rating,review) VALUES (?,?,?,?,?)";
  const [result] = await connection.execute(sql, [id, user_id, book_id, rating, review]);
  return result;
};
module.exports = {
  getReviews,
  addReview,
};

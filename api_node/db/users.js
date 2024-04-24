const connection = require("./connect");
const crypto = require("crypto");

async function createUser(user) {
  const { username, email, password } = user;
  const id = crypto.randomUUID();
  const sql =
    "INSERT INTO Users (id, username, email, password) VALUES (?, ?, ?, ?)";

  try {
    const result = await connection.query(sql, [id, username, email, password]);
    return result;
  } catch (err) {
    throw err; // Rethrow the error after logging (or handle it as needed)
  }
}

async function getUserById(userId, select) {
  const sql = `SELECT ${select} FROM Users WHERE id = ?`;

  try {
    const result = await connection.query(sql, [userId]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(userEmail, select) {
  const sql = `SELECT ${select} FROM Users WHERE email = ?`;

  try {
    const result = await connection.query(sql, [userEmail]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function updateUser(userId, updates) {
  let updateSql = "";
  let updateValue = [];
  Object.entries(updates).forEach(([name, value]) => {
    console.log(name, value);
    updateSql += `${name} = ?,`;
    updateValue.push(value);
  });
  const sql = `UPDATE Users SET ${updateSql} updated = now() WHERE id = ?`;
  updateValue.push(userId);
  try {
    const result = await connection.query(sql, updateValue);
    return result;
  } catch (err) {
    throw err;
  }
}

async function deleteUser(userId) {
  const sql = "DELETE FROM Users WHERE id = ?";

  try {
    const result = await connection(sql, [userId]);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};

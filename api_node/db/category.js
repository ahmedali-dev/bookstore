const connection = require("./connect");
const crypto = require("crypto").randomUUID;

const getAllCategory = async () => {
  const sql = `select * from categorys`;
  const [result] = await connection.query(sql);
  return result;
};

const addNewCategory = async (name) => {
  const sql = `insert into Categorys(id, name) values (?,?)`;
  const [result] = await connection.query(sql, [crypto(), name]);
  return result;
};

module.exports = {
  getAllCategory,
  addNewCategory,
};

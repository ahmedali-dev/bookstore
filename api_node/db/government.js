const connection = require("./connect");

module.exports = async () => {
  const sql = "select * from government";
  const result = await connection.execute(sql);
  return result;
};

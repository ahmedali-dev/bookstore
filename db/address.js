const connection = require("./connect");

class address {
  constructor() {
    this.connection = connection;
  }

  async updateOrInsertAddress({ user_id, username, mobile, government, city, address }) {
    const selectQuery = `SELECT id FROM address WHERE user_id = ?`;
    const selectParams = [user_id];

    const [rows] = await connection.execute(selectQuery, selectParams);
    console.log("🚀 ~ address ~ updateOrInsertAddress ~ rows:", rows[0]?.id);

    if (rows.length > 0) {
      const updateQuery = `UPDATE address SET 
            username = ?, 
            mobile = ?, 
            government = ?, 
            city = ?, 
            address = ? 
            WHERE user_id = ? and id=?`;
      const updateParams = [username, mobile, government, city, address, user_id, rows[0].id];
      await connection.execute(updateQuery, updateParams);
      return { id: rows[0].id, user_id, username, mobile, government, city, address };
    } else {
      const insertQuery = `INSERT INTO address (user_id, username, mobile, government, city, address) 
            VALUES (?, ?, ?, ?, ?, ?)`;
      const insertParams = [user_id, username, mobile, government, city, address];
      const [result] = await connection.execute(insertQuery, insertParams);
      if (result.affectedRows === 1) {
        const [row] = await this.getAddress(user_id);
        return { id: row.id, user_id, username, mobile, government, city, address };
      }
      return { id: result.insertId, user_id, username, mobile, government, city, address };
    }
  }

  async getAddress(user_id) {
    const [rows] = await connection.execute(`SELECT * FROM address WHERE user_id = ?`, [user_id]);
    return rows;
  }
}

module.exports = new address();

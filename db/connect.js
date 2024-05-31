const mysql = require("mysql2/promise");
const util = require("util");
const connectionConfig = {
  host: process.env.host, // or the IP address of your MySQL server
  user: process.env.user, // your MySQL username
  password: process.env.password, // your MySQL password
  database: process.env.database, // the database you want to connect to
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
// Create a connection to the database
const connection = mysql.createPool(connectionConfig);
// mysql.createPool(connectionConfig).promise();

module.exports = connection;

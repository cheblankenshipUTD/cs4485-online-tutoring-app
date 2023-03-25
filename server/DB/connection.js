const mysql = require("mysql2");
const path = require('path');
require("dotenv").config({ path: "./../.env"});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.PORT,
  database: "tutorDB",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected to database");
});

module.exports = connection;

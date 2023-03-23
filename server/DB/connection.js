const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "tutorDB",
  user: "root",
  password: "Database",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected to database");
});

module.exports = connection;

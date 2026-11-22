const mysql = require("mysql2");

//setup connessione DB
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "root",
  database: "blog",
});

//avvio connessione DB
connection.connect((err) => {
  if (err) throw err;

  console.log("Connected to MySQL");
});

module.exports = connection;

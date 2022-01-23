const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodedb",
  password: "123qwe",
});
const users = [
    ["Bob", 2322],
    ["Alice", 22325],
    ["Kate", 23228]
  ];
  const sql = `INSERT INTO users(name, phone) VALUES ?`;
   
  connection.query(sql, [users], function(err, results) {
      if(err) console.log(err);
      console.log(results);
  });
connection.query("SELECT * FROM users",
  function(err, results, fields) {
    console.log(err);
    console.log(results); // собственно данные
    console.log(fields); // мета-данные полей 
});
connection.end();
connection.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});
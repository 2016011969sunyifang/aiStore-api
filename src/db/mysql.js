const mysql = require("mysql");
const { MYSQL_CONF } = require("../config/db.js");

// 连接数据库
const con = mysql.createConnection({
  host: "106.14.196.158",
  user: "root",
  password: "04bf828a99fbb4d8",
  port: "3306",
  database: "aiStore",
});

// 连接数据库
con.connect();

// 执行sql语句
function exec(sql) {
  return new Promise((resolve, reject) => {
    if (!sql) {
      return resolve("");
    }
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      return resolve(result);
    });
  });
}

module.exports = {
  exec,
  escape: mysql.escape,
};

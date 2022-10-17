const { exec, escape } = require("../db/mysql.js");
const login = (name, password) => {
  const sql = `select * from user where name=${escape(
    name
  )} and password=${escape(password)}`;
  return exec(sql).then((rows) => {
    const sqlToken = `select token from access_token where user_id=${escape(
      rows[0].id
    )}`;
    return exec(sqlToken).then((insertData) => {
      return {
        token: rows[0].phone,
      };
    });
  });
};
const register = (name, phone, password) => {
  const sqlHas = `select id from user where name=${escape(
    name
  )} and password=${escape(password)}`;
  const sql = `
    insert into user (name, phone, password) 
    values('${name}', '${phone}','${password}')
`;
  return exec(sqlHas).then((rows) => {
    if (rows.length == 0) {
      return exec(sql).then((insertData) => {
        return exec(sqlHas).then((hasData) => {
          console.log(hasData, "hasData");
          if (hasData.length !== 0) {
            const insertSql = `
            insert into access_token (user_id, token) 
            values('${hasData[0].id}', '${phone}')
            `;
            return exec(insertSql).then((insertData) => {
              return {
                token: phone,
              };
            });
          } else {
            return {
              token: phone,
            };
          }
        });
      });
    } else {
      return { errorMessage: "当前用户已注册，请直接登录" };
    }
  });
};

const getUserInfo = (name, password) => {
  const sql = `select name from user where name=${escape(name)}`;
  return exec(sql).then((insertData) => {
    return "";
  });
  // if (username === 'sunrifa' && password === '123456') {
  //     return true
  // }
  // return false
};
module.exports = {
  login,
  register,
  getUserInfo,
};

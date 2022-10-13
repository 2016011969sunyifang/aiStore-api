const { exec, escape } = require("../db/mysql.js");
const login = (name, password) => {
  const sql = `select name from user where name=${escape(
    name
  )} and password=${escape(password)}`;
  return exec(sql).then((rows) => {
    return {
      rows: rows,
      token:
        "-......----.--.-/-.---......----/-.--.-.--.-..-./--------....--../-..............-/-.--.--.-.-..../---..-...--...-/-..----.--.....",
    };
  });
};
const register = (name, phone, password) => {
  const sqlHas = `select name from user where name=${escape(
    name
  )} and password=${escape(password)}`;
  const sql = `
    insert into user (name, phone, password) 
    values('${name}', '${phone}','${password}')
`;
  return exec(sqlHas).then((rows) => {
    if (rows.length == 0) {
      return exec(sql).then((insertData) => {
        return {
          token:
            "-......----.--.-/-.---......----/-.--.-.--.-..-./--------....--../-..............-/-.--.--.-.-..../---..-...--...-/-..----.--.....",
        };
      });
    } else {
      return { errorMessage: "当前用户已注册，请直接登录" };
    }
  });
};
const getUserInfo = (username, password) => {
  const sql = "";
  const userInfo = {
    email: "1743369777@qq.com",
    headImg: "https://s3.bmp.ovh/imgs/2022/03/bd52f28f3f79cdea.gif",
    loginIp: "101.231.62.66",
    name: "小嫒同学",
    nickName: "",
    phone: "13553550634",
    remark: null,
  };
  return exec(sql).then((insertData) => {
    return userInfo;
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

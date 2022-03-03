const { exec, escape } = require("../db/mysql.js");
const login = (username, password) => {
  const sql = `select username from user where username=${escape(
    username
  )} and password=${escape(password)}`;
  return exec(sql).then((rows) => {
    return {
      rows: rows,
      token:
        "-......----.--.-/-.---......----/-.--.-.--.-..-./--------....--../-..............-/-.--.--.-.-..../---..-...--...-/-..----.--.....",
    };
  });
  // if (username === 'sunrifa' && password === '123456') {
  //     return true
  // }
  // return false
};
const register = (username, password) => {
  const sql = `
    insert into user (username, password) 
    values('${username}', '${password}')
`;
  return exec(sql).then((insertData) => {
    return {
      token:
        "-......----.--.-/-.---......----/-.--.-.--.-..-./--------....--../-..............-/-.--.--.-.-..../---..-...--...-/-..----.--.....",
    };
  });
  // if (username === 'sunrifa' && password === '123456') {
  //     return true
  // }
  // return false
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

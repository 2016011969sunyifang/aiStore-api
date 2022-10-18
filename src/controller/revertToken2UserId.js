//先简单封装下 有空再来封装其他加密、等方案
const { exec, escape } = require("../db/mysql.js");
const dealToken = async (token) => {
  const sql = `select user_id from access_token where token=${escape(token)}`;
  let user_token_data = await exec(sql);
  return user_token_data[0].user_id;
};
module.exports = {
  dealToken,
};

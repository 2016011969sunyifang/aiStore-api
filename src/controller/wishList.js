const { exec, escape } = require("../db/mysql.js");
const { dealToken } = require("./revertToken2UserId.js");
// 引入实现文件上传的模块
const insertWishList = async (req) => {
  try {
    let user_id = await dealToken(req.headers.token);
    if (user_id) {
      console.log(user_id);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  insertWishList,
};

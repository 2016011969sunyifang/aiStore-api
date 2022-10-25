const { exec, escape } = require("../db/mysql.js");
const { dealToken } = require("./revertToken2UserId.js");
const {
  getSelectByConditions,
  getTotal,
} = require("./../utils/helpFunction.js");
const createTime = Date.now();

// 新增心愿单
const getProductDetail = async (req) => {
  try {
    let user_id = await dealToken(req.headers.token);

    if (user_id) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getProductDetail,
};

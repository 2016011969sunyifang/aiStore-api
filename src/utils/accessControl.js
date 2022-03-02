/**
 * 设置请求头
 * @param {Request} res res对象
 * @param {String} accessUrl 允许跨域的地址
 * @returns {Request} 经过处理的res对象
 */
const setAccessControl = function (res, accessUrl = "*") {
  res.setHeader("Access-Control-Allow-Origin", `${accessUrl}`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", " 3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  return res;
};
module.exports = {
  setAccessControl,
};

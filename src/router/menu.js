const { getMenu } = require("../controller/menu");
const { SuccessModel, ErrorModel } = require("../model/resModel");
//验证是否登录
const checkLogin = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("登录失败"));
  }
};
const handleMenuRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";

  // 获取博客列表
  if (GET && req.path === "/api/account/permmenu") {
    const result = getMenu();

    return result.then((row) => {
      if (row) {
        return new SuccessModel(row, "菜单获取成功");
      } else {
        return new ErrorModel("注册失败");
      }
    });
  }
};

module.exports = handleMenuRouter;

const { login, register, getUserInfo } = require("./../controller/user");
const { SuccessModel, ErrorModel } = require("./../model/resModel");
const handleUserRouter = (req, res) => {
  console.log(req.body);
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  //登录
  if (POST && req.path === "/api/user/login") {
    const { name, password } = req.body;
    const result = login(name, password);
    return result.then((row) => {
      if (row) {
        return new SuccessModel(row, "登录成功");
      } else {
        return new ErrorModel("登录失败");
      }
    });
  }
  // 获取用户信息
  if (GET && req.path === "/api/user/info") {
    const result = getUserInfo({ headers: req.headers });
    return result.then((row) => {
      if (row) {
        return new SuccessModel(row, "获取用户信息成功");
      } else {
        return new ErrorModel("获取用户信息失败");
      }
    });
  }
  //注册
  if (POST && req.path === "/api/user/register") {
    const { name, phone, password } = req.body;
    const result = register(name, phone, password);
    return result.then((reb) => {
      if (reb.token) {
        return new SuccessModel({ token: reb.token }, "注册成功");
      } else {
        return new ErrorModel(reb.errorMessage);
      }
    });
  }
};
module.exports = handleUserRouter;

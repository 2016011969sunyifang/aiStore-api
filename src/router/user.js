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
      if (row.rows.length !== 0) {
        return new SuccessModel(row, "登录成功");
      } else {
        return new ErrorModel("登录失败");
      }
    });
  }
  // 获取用户信息
  if (GET && req.path === "/api/account/info") {
    // const { username, password } = req.body;
    // const {username, password} = req.query
    // const result = login(username, password);

    const result = getUserInfo();
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
        return new SuccessModel(reb.token, "注册成功");
      } else {
        return new ErrorModel(reb.errorMessage);
      }
    });
  }
  // if (method == 'GET' && req.path === '/api/user/login-test') {
  //     if (req.session.name) {
  //         return  Promise.resolve(
  //             new SuccessModel({
  //                 session: req.session
  //             })
  //         )
  //     }
  //     return  Promise.resolve(
  //         new ErrorModel('登录失败')
  //     )

  // }
};
module.exports = handleUserRouter;

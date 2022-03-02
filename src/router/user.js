const { login, register, getUserInfo } = require("./../controller/user");
const { SuccessModel, ErrorModel } = require("./../model/resModel");
const handleUserRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  //登录
  if (POST && req.path === "/api/login") {
    const { username, password } = req.body;
    // const {username, password} = req.query
    const result = login(username, password);
    return result.then((row) => {
      if (row) {
        // //操作cookie
        // res.setHeader('Set-Cookie',`username=${row.username};path=/;httpOnly`)
        //设置session
        // req.session.username = row.username;
        // req.session.realname = row.realname;
        // 设置redis的session的值
        // set(req.sessionId, req.session)
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
    const { username, password } = req.body;
    const result = register(username, password);
    return result.then((row) => {
      if (row) {
        // //操作cookie
        // res.setHeader('Set-Cookie',`username=${row.username};path=/;httpOnly`)
        //设置session
        // req.session.username = row.username;
        // req.session.realname = row.realname;
        // 设置redis的session的值
        // set(req.sessionId, req.session)
        return new SuccessModel(row, "注册成功");
      } else {
        return new ErrorModel("注册失败");
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

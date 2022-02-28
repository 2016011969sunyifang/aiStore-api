const { login, register } = require("./../controller/user");
const { SuccessModel, ErrorModel } = require("./../model/resModel");
const handleUserRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  //登录
  if (POST && req.path === "/api/user/login") {
    const { username, password } = req.body;
    // const {username, password} = req.query
    // console.log(username, password, req.body)
    const result = login(username, password);
    return result.then((row) => {
      if (row.username) {
        // //操作cookie
        // res.setHeader('Set-Cookie',`username=${row.username};path=/;httpOnly`)
        //设置session
        req.session.username = row.username;
        req.session.realname = row.realname;
        // 设置redis的session的值
        // set(req.sessionId, req.session)
        return new SuccessModel("登录成功");
      } else {
        return new ErrorModel("登录失败");
      }
    });
  }
  //注册
  if (GET && req.path === "/api/user/register") {
    const { username, password } = req.query;
    const result = register(username, password);
    return result.then((row) => {
      if (row) {
        console.log(row);
        // //操作cookie
        // res.setHeader('Set-Cookie',`username=${row.username};path=/;httpOnly`)
        //设置session
        // req.session.username = row.username;
        // req.session.realname = row.realname;
        // 设置redis的session的值
        // set(req.sessionId, req.session)
        return new SuccessModel("注册成功");
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

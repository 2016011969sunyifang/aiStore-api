const { newSite, getList } = require("../controller/site");
const { SuccessModel, ErrorModel } = require("../model/resModel");
//验证是否登录
const checkLogin = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("登录失败"));
  }
};
const handleSiteRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  const id = req.query.id || "";

  // 获取站点列表
  if (GET && req.path === "/api/site/list") {
    const params = {};
    console.log();
    params.businessCircle = req.query.businessCircle || "";
    params.name = req.query.name || "";
    params.webmaster = req.query.webmaster || "";
    params.platform = req.query.platform || "";
    params.hasDormitory = req.query.hasDormitory || "";
    params.hasElectroMobile = req.query.hasElectroMobile || "";
    params.status = req.query.status || "";
    params.region = req.query.region || "";
    console.log(req.query);
    // // 管理员界面
    // if (req.query.isadmin) {
    //   // 登录验证
    //   const checkLoginResult = checkLogin(req);
    //   if (checkLoginResult) {
    //     return checkLoginResult;
    //   }
    //   // 强制查询自己的站点
    //   author = req.session.username;
    // }
    const result = getList(params);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }
  // 获取站点详情
  if (GET && req.path === "/api/site/detail") {
    const detailResult = getDetail(id);

    return detailResult.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }
  // 新建一篇站点
  if (POST && req.path === "/api/site/new") {
    // // 登录验证
    // const checkLoginResult = checkLogin(req);
    // if (checkLoginResult) {
    //   return checkLoginResult;
    // }
    // req.body.author = req.session.username;
    const result = newSite(req.body);
    return result.then((newData) => {
      return new SuccessModel(newData);
    });
  }
  // 更新一篇站点
  if (POST && req.path === "/api/site/update") {
    // 登录验证
    const checkLoginResult = checkLogin(req);
    if (checkLoginResult) {
      return checkLoginResult;
    }

    const result = updateBlog(id, req.body);

    return result.then((res) => {
      if (res) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新站点失败！");
      }
    });
  }
  // 删除一篇站点
  if (POST && req.path === "/api/site/del") {
    // 登录验证
    const checkLoginResult = checkLogin(req);
    if (checkLoginResult) {
      return checkLoginResult;
    }

    const author = req.session.username;
    const result = deleteBlog(id, author);

    return result.then((res) => {
      if (res) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除站点失败！");
      }
    });
  }
};
module.exports = handleSiteRouter;

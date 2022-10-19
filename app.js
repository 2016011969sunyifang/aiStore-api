const quertstring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const handleMenuRouter = require("./src/router/menu");
const handleSiteRouter = require("./src/router/site");
const handleCommonRouter = require("./src/router/common");
const handleWishListRouter = require("./src/router/wishList");
const { access } = require("./src/utils/log");
const { setAccessControl } = require("./src/utils/accessControl");

// session数据
const SESSION_DATA = {};
//promise获取post
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    console.log(req.headers["content-type"], 'req.headers["Content-Type"]');

    if (req.headers["content-type"].includes("multipart/form-data")) {
      console.log("文件上传");
      resolve(req);
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      console.log("content出错");
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};
const serverHandle = (req, res) => {
  res = setAccessControl(res);
  if (req.method == "OPTIONS") {
    res.writeHead(204, { "Content-type": "text/plain" });
    res.end();
    return;
  }
  //记录 access log
  access(
    `${req.method} -- ${req.url} -- ${
      req.headers["user-agent"]
    } -- ${Date.now()}`
  );
  //         env:process.env.NODE_ENV
  const url = req.url;
  req.path = url.split("?")[0];
  //解析参数
  req.query = quertstring.parse(url.split("?")[1]);
  //解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(":").forEach((item) => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });
  // 处理session
  let userId = req.cookie.userid;
  let needSetCookie = false;
  if (userId) {
    if (![userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];
  //处理postdata
  getPostData(req).then((postData) => {
    req.body = postData;
    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; `);
        }
        res.end(JSON.stringify(userData));
      });
      return;
    }
    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; `);
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }
    // 处理commonRequest路由
    const commonResult = handleCommonRouter(req.body, res);
    if (commonResult) {
      commonResult.then((menuData) => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; `);
        }
        res.end(JSON.stringify(menuData));
      });

      return;
    }
    // 处理menu路由
    const wishListResult = handleWishListRouter(req, res);
    if (wishListResult) {
      wishListResult.then((menuData) => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; `);
        }
        res.end(JSON.stringify(menuData));
      });

      return;
    }
    // 处理menu路由
    const menuResult = handleMenuRouter(req, res);
    if (menuResult) {
      menuResult.then((menuData) => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; `);
        }
        res.end(JSON.stringify(menuData));
      });

      return;
    }
    // 处理外卖站点路由
    const siteResult = handleSiteRouter(req, res);
    if (siteResult) {
      siteResult.then((menuData) => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; `);
        }
        res.end(JSON.stringify(menuData));
      });

      return;
    }
    //路由未命中
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
};
module.exports = serverHandle;

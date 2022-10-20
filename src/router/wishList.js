const { insertWishList } = require("./../controller/wishList");
const { SuccessModel, ErrorModel } = require("./../model/resModel");
const handleWishListRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  //登录
  if (POST && req.path === "/api/wishList/insert") {
    const result = insertWishList(req);
    return result.then((row) => {
      console.log(row, "rowrow");
      if (row) {
        return new SuccessModel(row, "心愿单新增成功");
      } else {
        return new ErrorModel("心愿单新增失败");
      }
    });
  }
};
module.exports = handleWishListRouter;

const {
  insertWishList,
  getWishList,
  deleteWishList,
} = require("./../controller/wishList");
const { SuccessModel, ErrorModel } = require("./../model/resModel");
const handleWishListRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  // 插入
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
  // 删除
  if (POST && req.path === "/api/wishList/delete") {
    const result = deleteWishList(req);
    return result.then((row) => {
      console.log(row, "rowrow");
      if (row) {
        return new SuccessModel(row, "心愿单删除成功");
      } else {
        return new ErrorModel("心愿单删除失败");
      }
    });
  }
  // 查询
  if (GET && req.path === "/api/wishList/get") {
    const result = getWishList(req);
    return result.then((row) => {
      console.log(row, "rowrow");
      if (row) {
        return new SuccessModel(row, "心愿单获取成功");
      } else {
        return new ErrorModel("心愿单获取失败");
      }
    });
  }
};
module.exports = handleWishListRouter;

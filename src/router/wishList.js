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
        return new SuccessModel(row, "文件上传成功");
      } else {
        return new ErrorModel("文件上传失败");
      }
    });
  }
};
module.exports = handleWishListRouter;

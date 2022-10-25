const { getProductDetail } = require("./../controller/orderList");
const { SuccessModel, ErrorModel } = require("./../model/resModel");
const handleProductRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  // 新增收货地址
  if (POST && req.path === "/api/product/getProductDetail") {
    const result = getProductDetail(req);
    return result.then((row) => {
      console.log(row, "rowrow");
      if (row) {
        return new SuccessModel(row, "商品详情获取成功");
      } else {
        return new ErrorModel("商品详情获取失败");
      }
    });
  }
};
module.exports = handleProductRouter;

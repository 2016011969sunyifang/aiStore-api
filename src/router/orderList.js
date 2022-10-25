const { getOrderDetail } = require("./../controller/orderList");
const { SuccessModel, ErrorModel } = require("./../model/resModel");
const handleOrderListRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  // 新增收货地址
  if (POST && req.path === "/api/orderList/getOrderDetail") {
    const result = getOrderDetail(req);
    return result.then((row) => {
      console.log(row, "rowrow");
      if (row) {
        return new SuccessModel(row, "订单详情获取成功");
      } else {
        return new ErrorModel("订单详情获取失败");
      }
    });
  }
};
module.exports = handleOrderListRouter;

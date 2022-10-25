const { insertUserAddress } = require("./../controller/userAddress");
const { SuccessModel, ErrorModel } = require("./../model/resModel");
const handleUserAddressRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  // 新增收货地址
  if (POST && req.path === "/api/userAddress/insert") {
    const result = insertUserAddress(req);
    return result.then((row) => {
      console.log(row, "rowrow");
      if (row) {
        return new SuccessModel(row, "地址新增成功");
      } else {
        return new ErrorModel("地址单新增失败");
      }
    });
  }
};
module.exports = handleUserAddressRouter;

const { exec, escape } = require("../db/mysql.js");
const { dealToken } = require("./revertToken2UserId.js");
// 引入实现文件上传的模块
const insertWishList = async (req) => {
  try {
    let user_id = await dealToken(req.headers.token);

    if (user_id) {
      const { title, wishCoin, wishListLink, wishListImg, wishListContent } =
        req.body;
      const insertWishListSql = `
      insert into wish_list (title, wish_prise,wish_link,wish_img_id,description) 
      values('${title}', '${wishCoin}', '${wishListLink}','${wishListImg}','${wishListContent}')
      `;
      return exec(insertWishListSql).then((insertData) => {
        if (insertData) {
          return "success";
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  insertWishList,
};

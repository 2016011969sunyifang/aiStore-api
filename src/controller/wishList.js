const { exec, escape } = require("../db/mysql.js");
const { dealToken } = require("./revertToken2UserId.js");
const {
  getSelectByConditions,
  getTotal,
} = require("./../utils/helpFunction.js");
const createTime = Date.now();

// 新增心愿单
const insertWishList = async (req) => {
  try {
    let user_id = await dealToken(req.headers.token);

    if (user_id) {
      const { title, wishCoin, wishListLink, wishListImg, wishListContent } =
        req.body;
      const insertWishListSql = `
      insert into wish_list (title, wish_prise,wish_link,wish_img_id,description,createTime) 
      values('${title}', '${wishCoin}', '${wishListLink}','${wishListImg}','${wishListContent}','${createTime}')
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
//查询心愿单
const getWishList = async (req) => {
  try {
    let user_id = await dealToken(req.headers.token);

    if (user_id) {
      const {
        title,
        wishCoin,
        wishListLink,
        wishListContent,
        index,
        pageSize,
        createTime,
        sortArr,
      } = req.query;
      const selectWishListSql = {
        title: title,
        wish_prise: wishCoin,
        wish_link: wishListLink,
        description: wishListContent,
        createTime: createTime,
      };
      let sql = getSelectByConditions("wish_list", selectWishListSql, {
        index: index,
        pageSize: pageSize,
        sortArr,
      });

      return exec(sql).then(async (getData) => {
        let total = await getTotal("wish_list");
        if (getData && total) {
          return { wishList: getData, total };
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  insertWishList,
  getWishList,
};

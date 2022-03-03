const { exec } = require("../db/mysql.js");
const xss = require("xss");
const getList = (params) => {
  let sql = `select * from takeOut where 1=1`;
  if (params.region) {
    sql += ` and region='${params.region}' `;
  }
  if (params.businessCircle) {
    sql += ` and businessCircle like '%${params.businessCircle}%' `;
  }
  if (params.name) {
    sql += ` and name like '%${params.name}%' `;
  }
  if (params.webmaster) {
    sql += ` and webmaster like '%${params.webmaster}%' `;
  }
  if (params.platform) {
    sql += ` and platform='${params.platform}' `;
  }
  if (params.hasDormitory) {
    sql += ` and hasDormitory='${params.hasDormitory}' `;
  }
  if (params.hasElectroMobile) {
    sql += ` and hasElectroMobile='${params.hasElectroMobile}' `;
  }
  if (params.status) {
    sql += ` and status='${params.status}' `;
  }
  sql += " order by createtime desc;";
  console.log(sql);
  return exec(sql);
};
const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((row) => {
    return row[0];
  });
  // return {
  //     id:1,
  //     title:'标题A',
  //     content:'内容A',
  //     createTime:"1555823027999",
  //     author:'sunrifa'
  // }
};
const newSite = (blogData = {}) => {
  const name = blogData.name;
  const region = blogData.region;
  const webmaster = blogData.webmaster;
  const priceLow = blogData.priceLow;
  const priceHigh = blogData.priceHigh;
  const platform = blogData.platform;
  const hasDormitory = blogData.hasDormitory;
  const hasElectroMobile = blogData.hasElectroMobile;
  const status = blogData.status;
  const businessCircle = blogData.businessCircle;
  const webmasterPhone = blogData.webmasterPhone;
  const electroMobilePrice = blogData.electroMobilePrice;
  const dormitoryPrice = blogData.dormitoryPrice;
  const detailedAddress = blogData.detailedAddress;
  const wagesAndBenefits = blogData.wagesAndBenefits;
  const notes = blogData.notes;
  const createTime = Date.now();

  const sql = `
        insert into takeOut (createTime,notes,wagesAndBenefits,detailedAddress,dormitoryPrice,electroMobilePrice,webmasterPhone,name, region, webmaster, priceLow,priceHigh,platform,hasDormitory,hasElectroMobile,status,businessCircle) 
        values('${createTime}','${notes}','${wagesAndBenefits}','${detailedAddress}','${dormitoryPrice}','${electroMobilePrice}', '${webmasterPhone}','${name}', '${region[1]}', '${webmaster}', ${priceLow},  ${priceHigh}, ${platform}, ${hasDormitory}, ${hasElectroMobile}, ${status}, '${businessCircle}')
    `;
  console.log(sql);
  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};

const updateSite = (id, postData) => {
  const title = postData.title;
  const content = postData.content;

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;

  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
  // return true
};
const deleteSite = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`;
  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
  // return true
};
module.exports = {
  getList,
  getDetail,
  newSite,
  updateSite,
  deleteSite,
};

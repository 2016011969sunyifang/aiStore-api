const { exec, escape } = require("../db/mysql.js");

/**
 *
 * @param {数据库名称} tableName
 * @param {需要检索的字段} conditions
 * @param {index pageSize等筛选项} pageOption
 * @param {其余想加入的sql} optionTextSql
 * @returns
 */
function getSelectByConditions(
  tableName,
  conditions,
  pageOption,
  optionTextSql = ""
) {
  let sql = `select * from ${tableName} where 1=1 and state = 1`;
  const { index, pageSize, sortArr } = pageOption;
  for (const key in conditions) {
    if (conditions[key]) {
      sql += ` and ${key}='${conditions[key]}' `;
    }
  }
  if (sortArr && sortArr.length > 0) {
    let sortSql = "order by";
    for (let i = 0; i < sortArr.length; i++) {
      sortSql += ` ${sortArr[i].prop} ${sortArr[i].order},`;
    }
    sql += sortSql;
  }
  sql += optionTextSql;
  if (index && pageSize) {
    sql += ` limit ${(index - 1) * pageSize},${pageSize}`;
  }
  return sql;
}
const getTotal = async (tableName) => {
  try {
    console.log(tableName);
    const sql = `select count(*) from ${tableName}`;
    let total = await exec(sql);
    return total[0]["count(*)"];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSelectByConditions,
  getTotal,
};

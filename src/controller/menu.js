const { exec } = require("../db/mysql.js");
const xss = require("xss");
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1`;
  if (author) {
    sql += ` and author='${author}' `;
  }

  if (keyword) {
    sql += ` and title like '%${keyword}%' `;
  }
  sql += " order by createtime desc;";
  //先返回假数据
  return exec(sql);
};
const getMenu = () => {
  let sql = "";
  const menuData = {
    menus: [
      {
        createdAt: "2020-08-28 10:09:26",
        updatedAt: "2021-12-15 04:58:59",
        id: 1,
        parentId: null,
        name: "系统",
        router: "/sys",
        perms: null,
        type: 0,
        icon: "icon-shezhi",
        orderNum: 255,
        viewPath: null,
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-08-01 00:00:00",
        updatedAt: "2021-12-15 04:58:59",
        id: 3,
        parentId: 1,
        name: "权限管理",
        router: "/sys/permssion",
        perms: null,
        type: 0,
        icon: "icon-quanxian",
        orderNum: 0,
        viewPath: "",
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-08-08 00:00:00",
        updatedAt: "2021-12-15 04:58:58",
        id: 4,
        parentId: 3,
        name: "用户列表",
        router: "/sys/permssion/user",
        perms: null,
        type: 1,
        icon: "icon-yonghu",
        orderNum: 0,
        viewPath: "views/system/permission/user",
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-08-15 00:00:00",
        updatedAt: "2021-12-15 04:58:58",
        id: 5,
        parentId: 4,
        name: "新增",
        router: null,
        perms: "sys:user:add",
        type: 2,
        icon: null,
        orderNum: 0,
        viewPath: null,
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-08-15 00:00:00",
        updatedAt: "2021-12-15 04:58:58",
        id: 6,
        parentId: 4,
        name: "删除",
        router: null,
        perms: "sys:user:delete",
        type: 2,
        icon: null,
        orderNum: 0,
        viewPath: null,
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-08-08 00:00:00",
        updatedAt: "2021-12-15 04:59:02",
        id: 7,
        parentId: 3,
        name: "菜单列表",
        router: "/sys/permssion/menu",
        perms: null,
        type: 1,
        icon: "icon-tiaoxingtu",
        orderNum: 0,
        viewPath: "views/system/permission/menu",
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-08-15 00:00:00",
        updatedAt: "2021-12-15 04:59:02",
        id: 8,
        parentId: 7,
        name: "新增",
        router: null,
        perms: "sys:menu:add",
        type: 2,
        icon: null,
        orderNum: 0,
        viewPath: null,
        keepalive: false,
        isShow: false,
      },
      {
        createdAt: "2020-08-15 00:00:00",
        updatedAt: "2021-12-15 04:59:01",
        id: 9,
        parentId: 7,
        name: "删除",
        router: null,
        perms: "sys:menu:delete",
        type: 2,
        icon: null,
        orderNum: 0,
        viewPath: null,
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-09-02 08:22:27",
        updatedAt: "2021-12-15 04:59:01",
        id: 10,
        parentId: 7,
        name: "查询",
        router: null,
        perms: "sys:menu:list,sys:menu:info",
        type: 2,
        icon: null,
        orderNum: 0,
        viewPath: null,
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-09-04 06:26:36",
        updatedAt: "2021-12-15 04:59:00",
        id: 17,
        parentId: 16,
        name: "测试",
        router: "",
        perms: "sys:menu:list,sys:menu:update,sys:menu:info,sys:menu:add",
        type: 2,
        icon: "",
        orderNum: 0,
        viewPath: "",
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-09-04 08:08:53",
        updatedAt: "2021-12-15 04:59:00",
        id: 19,
        parentId: 7,
        name: "修改",
        router: "",
        perms: "sys:menu:update",
        type: 2,
        icon: "",
        orderNum: 0,
        viewPath: "",
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2021-04-12 04:28:03",
        updatedAt: "2021-12-15 04:59:00",
        id: 20,
        parentId: 4,
        name: "部门移动排序",
        router: null,
        perms: "sys:dept:move",
        type: 2,
        icon: null,
        orderNum: 255,
        viewPath: null,
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-09-04 09:41:43",
        updatedAt: "2021-12-15 04:59:00",
        id: 23,
        parentId: 3,
        name: "角色列表",
        router: "/sys/permission/role",
        perms: "",
        type: 1,
        icon: "icon-jiaosequanxian",
        orderNum: 0,
        viewPath: "views/system/permission/role",
        keepalive: false,
        isShow: true,
      },
      {
        createdAt: "2020-09-07 02:44:27",
        updatedAt: "2021-12-15 04:58:58",
        id: 25,
        parentId: 23,
        name: "删除",
        router: "",
        perms: "sys:role:delete",
        type: 2,
        icon: "",
        orderNum: 0,
        viewPath: "",
        keepalive: false,
        isShow: true,
      },
    ],
    perms: [
      "sys:user:add",
      "sys:user:delete",
      "sys:menu:add",
      "sys:menu:delete",
      "sys:menu:list",
      "sys:menu:info",
      "sys:menu:update",
      "sys:dept:move",
      "sys:role:delete",
      "sys:role:add",
      "sys:role:update",
      "sys:role:list",
      "sys:role:page",
      "sys:role:info",
      "sys:dept:list",
      "sys:dept:info",
      "sys:user:page",
      "sys:user:info",
      "sys:user:update",
      "sys:dept:transfer",
      "sys:dept:add",
      "sys:dept:delete",
      "sys:dept:update",
      "sys:online:list",
      "sys:online:kick",
      "sys:log:login:page",
      "sys:task:page",
      "sys:task:info",
      "sys:task:add",
      "sys:task:update",
      "sys:task:once",
      "sys:task:start",
      "sys:task:stop",
      "sys:task:delete",
      "sys:log:task:page",
      "sys:user:password",
    ],
  };
  return exec(sql).then((row) => {
    return menuData;
  });
  // return {
  //     id:1,
  //     title:'标题A',
  //     content:'内容A',
  //     createTime:"1555823027999",
  //     author:'sunrifa'
  // }
};
const newBlog = (blogData = {}) => {
  const title = xss(blogData.title);
  const content = blogData.content;
  const author = blogData.author;
  const createtime = Date.now();

  const sql = `
        insert into blogs (title, content, author, createtime) 
        values('${title}', '${content}', '${author}', ${createtime})
    `;

  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (id, postData) => {
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
const deleteBlog = (id, author) => {
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
  getMenu,
};

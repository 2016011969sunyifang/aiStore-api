const { exec, escape } = require("../db/mysql.js");
const { dealToken } = require("./revertToken2UserId.js");
// 引入实现文件上传的模块
const { IncomingForm } = require("formidable");
const path = require("path");
const uploadImg = async (req) => {
  try {
    let user_id = await dealToken(req.headers.token);
    if (user_id) {
      console.log(111111111111111111111111);
      // 2.添加必要的配置
      // 2.1 设置编码,formidable也可 接收普通键值对，这个时候就有需要设置编码，如果只是上传文件，则不用设置
      // form.encoding = 'utf-8'
      // // 2.2 设置上传文件的存放路径，一定给一个全路径，否则报错
      let form = new IncomingForm();
      form.uploadDir = __dirname;
      console.log(form.uploadDir);
      // // 2.3 设置是否保留文件的扩展名，默认不保留
      form.keepExtensions = true;
      // 3.调用上传方法,实现文件上传
      // form.parse(请求报文，回调函数)
      // err:文件上传失败时的错误信息
      // fields：接收到普通键值对--对象
      // files：文件的相关信息,特别是上传成功后在服务器端的信息
      form.parse(req, (err, fields, files) => {
        console.log(22222222222222222222222);

        if (err) {
          console.log(err, "errerrerrerrerr");
          return null;
        } else {
          console.log(3333333333333333333333);
          console.log(fields, "fieldsfieldsfieldsfieldsfields");
          console.log(files, "filesfilesfilesfilesfiles");
          return 1;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  uploadImg,
};

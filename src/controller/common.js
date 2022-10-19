const { exec, escape } = require("../db/mysql.js");
const { dealToken } = require("./revertToken2UserId.js");
// 引入实现文件上传的模块
const { IncomingForm } = require("formidable");
const path = require("path");
const uploadImg = async (req) => {
  try {
    let user_id = await dealToken(req.headers.token);
    if (user_id) {
      // 2.添加必要的配置
      // 2.1 设置编码,formidable也可 接收普通键值对，这个时候就有需要设置编码，如果只是上传文件，则不用设置
      // form.encoding = 'utf-8'
      // // 2.2 设置上传文件的存放路径，一定给一个全路径，否则报错
      let form = new IncomingForm();
      let pathFile = path.join(__dirname, "../../public/images");
      form.uploadDir = pathFile;
      console.log(form.uploadDir);
      // // 2.3 设置是否保留文件的扩展名，默认不保留
      form.keepExtensions = true;
      // 3.调用上传方法,实现文件上传
      // form.parse(请求报文，回调函数)
      // err:文件上传失败时的错误信息
      // fields：接收到普通键值对--对象
      // files：文件的相关信息,特别是上传成功后在服务器端的信息
      return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.log(err, "errerrerrerrerr");
            reject(null);
          } else {
            const insertImg = `
            insert into wish_img (img_ids, img_name) 
            values('${files.file.newFilename}', '${files.file.originalFilename}')
            `;
            let result = await exec(insertImg);
            if (result) {
              let returnObj = {
                fileId: files.file.newFilename,
                fileName: files.file.originalFilename,
              };
              resolve(returnObj);
            } else {
              reject(null);
            }
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  uploadImg,
};

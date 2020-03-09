// 按需导入 express 包
const express = require('express');

// body-parser 使用步骤：
// 作用：处理 application/x-www-form-urlencoded 格式参数
// 1. 下包     npm install body-parser
// 2. 导包     require('body-parser')
// 3. 启动     app.use()

// multer      使用步骤：
// 作用：处理 form-data 格式参数
// 1. 下包      npm install --save multer
// 2. 导包      require('multer')
// 3. 启动      这里分两步：1.配置，2.在 post 请求中添加参数名      
const bodyParser = require('body-parser');
const multer = require('multer');
// 按需导入 path 模块
const path = require('path');
// multer 3.1.配置，uploads 上传图片文件夹名称，用 path 拼接绝对路径
const upload = multer({ dest: path.join(__dirname, 'uploads/') });        

// 创建一个服务器
const app = express();

// 启动 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// multer 3.2.在 post 请求中添加参数名
app.post('/fd', upload.single('icon'), (request, response) => {
    console.log('请求报文', request);
    // request.file 是 `icon` 文件的信息
    const { originalname, size } = request.file;
    // request.body 将具有文本数据，如果存在的话
    const { name, age } = request.body;
    // 返回给客户端的消息
    response.send({
        code: 200,
        msg:`${ originalname }图片上传成功,大小为${ (size / 1024).toFixed(2) }kb`,
        name,
        age,
    });
});

// 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});

// 浏览器端访问：     本地服务器地址 + 端口号 + 接口地址
// POST 请求请用 postman 工具测试
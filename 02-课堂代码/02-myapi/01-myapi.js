// 1. 按需导入 express 包
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
// 3. 启动      这里分两步：1.配置，2.启动      
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: path.join(__dirname, 'uploads/') });        // uploads 上传图片放在哪个文件夹


// 2. 创建一个服务器
const app = express();

// 启动 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 3. 后端路由
app.get('/', (request, response) => {
    response.send('服务器首页');
});

// 2.启动
//    icon 上传图片时候的参数名
app.post('/fd', upload.single('icon'), (request, response) => {
    console.log(request);
    response.send('图片上传成功');
});

// 4. 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});

// 浏览器端访问：     本地服务器地址 + 端口号 + 接口地址
// POST 请求请用 postman 工具测试
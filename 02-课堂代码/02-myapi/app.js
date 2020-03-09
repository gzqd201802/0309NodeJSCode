// 按需导入 express 包
const express = require('express');
// 按需导入 body-parser 包，用于处理 application/x-www-form-urlencoded 格式参数
const bodyParser = require('body-parser');
// 按需导入 multer 包，用于处理 form-data 格式参数
const multer = require('multer');
// 按需导入 path 模块，用于拼接绝对路径
const path = require('path');
// multer 配置需要
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// 启动 express 服务器
const app = express();

// body-parser 配置需要
app.use(bodyParser.urlencoded({ extended: false }));

// ------------------  接口开始  ----------------------
// 写接口最需要关系的3部分：
//  1. 请求方式
//  2. 请求地址
//  3. 请求参数
app.post('/login', (request, response) => {
    // post 请求，通过 request.body 获取参数
    const { username, password } = request.body;
    if (username === 'admin' && password === '123456') {
        response.send({
            msg: '登录成功',
            code: 200
        });
    } else {
        response.send({
            msg: '用户名或密码错误',
            code: 400
        });
    }
});

// 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});

// 浏览器端访问：     本地服务器地址 + 端口号 + 接口地址
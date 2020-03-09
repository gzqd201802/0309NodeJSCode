// 按需导入 express 包
const express = require('express');
// 按需导入 body-parser 包，用于处理 application/x-www-form-urlencoded 格式参数
const bodyParser = require('body-parser');
// 按需导入 multer 包，用于处理 form-data 格式参数
const multer = require('multer');
// 按需导入 path 模块，用于拼接绝对路径
const path = require('path');
// 按需导入 fs 模块，用于读写文件
const fs = require('fs');

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

// 接口1：用户登录
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

// 接口2：### 英雄列表
// 请求地址：/list
// 请求方式：get
// 请求参数：无
app.get('/list', (request, response) => {
    // 1. 读取 utils/data/hero.json 文件
    const filePath = path.join(__dirname, 'utils/data/hero.json');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // 2.1 如果读取错误
            response.send({
                msg: '获取失败',
                code: 400
            });
        } else {
            // 2.2 把读取到的数据返回
            response.send({
                msg:'获取成功',
                code:200,
                // 记得把 buffer 转换数据格式，JSON.parse() 转换的格式更好
                data: JSON.parse(data)
            });
        }
    });

});


// 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});

// 浏览器端访问：     本地服务器地址 + 端口号 + 接口地址
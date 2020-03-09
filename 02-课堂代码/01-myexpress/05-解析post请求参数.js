// 1. 按需导入 express 包
const express = require('express');
// 按需导入 body-parser 包，用于处理 x-www-form-urlencoded 这类 post 请求
const bodyParser = require('body-parser');

console.log(bodyParser);

// 2. 创建一个服务器
const app = express();

// 启动 body-parser， application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// 3. 后端路由
// request    请求报文 - 客户端发过来的
// response   响应报文 - 服务器返回去的


// ### 用户注册 注册用户
// 请求地址：/api/user/register
// 请求方法：post
// 请求参数：username   用户名	不能为空

// post 请求 - 用 PostMan 客户端发请求
app.post('/api/user/register', (request, response) => {
    // 默认现象：请求报文中找不到 post 传递过来的数据
    console.log('请求报文', request);
    console.log('request.body', request.body);
    // 有了 body-parser 后，可以中 request.body 获取 post 请求的参数
    // 根据文档要求，解析出 username 参数
    const { username } = request.body;
    // 判断是否为空
    if (username.trim() === '' || username === undefined) {
        response.send('用户名不能为空');
    }else{
        // 如果不为空，就返回注册成功
        response.send(`${username}注册成功`);
    }
});

// 4. 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});

// 浏览器端访问：     本地服务器地址 + 端口号 + 接口地址
// POST 请求请用 postman 工具测试
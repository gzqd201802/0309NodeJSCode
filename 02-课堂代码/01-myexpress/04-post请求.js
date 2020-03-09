// 1. 按需导入 express 包
const express = require('express');
// 2. 创建一个服务器
const app = express();
// 3. 后端路由
// request    请求报文 - 客户端发过来的
// response   响应报文 - 服务器返回去的

// get 请求
app.get('/', (request, response) => {
    response.send('1.以get方式请求根路径，回来的信息1');
});

// post 请求
app.post('/', (request, response) => {
    response.send('2.以post方式请求根路径，回来的信息2');
});

// 4. 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});

// 浏览器端访问：     本地服务器地址 + 端口号 + 接口地址
// 客户端访问的完整地址：   http://127.0.0.1:3000/
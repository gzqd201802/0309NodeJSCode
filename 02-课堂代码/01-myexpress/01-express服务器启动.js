// 1. 按需导入 express 包
const express = require('express');
// 2. 创建一个服务器
const app = express();
// 3. 后端路由
// get        代表请求方式
//   /        url 地址
// request    请求报文 - 客户端发过来的
// response   响应报文 - 服务器返回去的
app.get('/', (request, response) => {
    response.send('首页访问成功');
});
// 4. 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});
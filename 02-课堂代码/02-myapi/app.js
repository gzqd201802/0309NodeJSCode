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


// 保存 utils/data/hero.json 文件的绝对路径
const filePath = path.join(__dirname, 'utils/data/hero.json');

// 接口2：### 英雄列表
// 请求地址：/list
// 请求方式：get
// 请求参数：无
app.get('/list', (request, response) => {
    // 1. 读取 utils/data/hero.json 文件
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
                msg: '获取成功',
                code: 200,
                // 记得把 buffer 转换数据格式，JSON.parse() 转换的格式更好
                data: JSON.parse(data)
            });
        }
    });
});


// 接口3：### 英雄新增
// 请求地址：/add
// 请求方式：post
// 请求参数：请使用 formData 的方式提交
// | name  | string | 英雄姓名 |
// | skill | string | 英雄技能 |
// | icon  | file | 英雄头像 |
app.post('/add', upload.single('icon'), (request, response) => {
    // request.file 是 `icon` 文件的信息
    const { filename } = request.file;
    // request.body 将具有文本数据
    const { name, skill } = request.body;


    // 把刚刚拼接的对象，写入到 hero.json 中。
    // 让代码按顺序执行 - 同步写法实现。
    //   1. 读取 hero.json 文件的内容。- 要读完才添加
    try {
        // 通过同步的方式读取文件，返回值是 buffer 格式数据
        let data = JSON.parse(fs.readFileSync(filePath));
        const dataObj = {
            // 获取数组最后一项的 id + 1
            id: data[data.length - 1].id + 1,
            name,
            skill,
            icon: `/uploads/${filename}`,
            isDelete: false
        };
        //   2. 往数据后追加刚刚准备的对象。
        // 把 buffer 数据转换成对象，在添加数据
        data = [...data, dataObj];
        //   3. 写入 hero.json 文件中。
        fs.writeFileSync(filePath, JSON.stringify(data));
        // 4. 最后要给客户端一个响应
        response.send({
            code: 200,
            msg: '新增成功'
        });
    } catch (error) {
        response.send({
            code: 400,
            msg: '参数错误'
        });
    }
});

// 接口4： ### 英雄删除
// 请求地址：/delete
// 请求方式：get
// 请求参数：
// |  id  | number | 英雄id |
app.get('/delete', (request, response) => {
    // get 参数在 request.query 中获取
    const { id } = request.query;
    // 删除涉及到文件的操作，所以也需要读写文件
    try {
        // 1. 读取 hero.json 文件的内容
        const data = JSON.parse(fs.readFileSync(filePath));
        // 2. 根据 id 找到数据的索引
        const index = data.findIndex(item => item.id == id);
        // 3. 根据索引删除掉对应的数组的一条数据
        data.splice(index, 1);
        // 4. 把操作后的数组重新写入到文件中
        fs.writeFileSync(filePath, JSON.stringify(data));
        // 5. 最后要给客户端一个响应
        response.send({
            msg: "删除成功",
            code: 200,
        });
    } catch (error) {
        response.send({
            msg: "参数错误",
            code: 400,
        });
    }
});



// 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});

// 浏览器端访问：     本地服务器地址 + 端口号 + 接口地址
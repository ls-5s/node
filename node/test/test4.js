// 中间件的注意事项
// 1.在路由之前注册中间件
// 2.多个中间件的执行顺序是按照注册的顺序执行的
// 3.中间件的next()函数必须调用，否则会导致请求挂起
// 4.中间件可以通过req对象向后续的中间件或路由传递信息
// 5.中间件可以通过res对象向客户端响应信息


// 中间件分类
// 1.应用级中间件(挂载在app上,例如app.get)
// 2.路由级中间件(挂载在router上,例如router.get)
// 3.错误级中间件
// 错误级别的中间件，必须注册在所有路由之后！
// const appErr = (err,req,res,next)=> {
//     console.log(err);
//     res.send({code:1,msg:'服务器错误'})
// } 
// app.use(appErr)
// 4.express 内置中间件
// 1. 配置静态资源目录
// express.static('public') 是 Express 内置的静态资源中间件
// 作用：将 'public' 文件夹设置为静态资源根目录，客户端可直接访问该目录下的文件
// 例如：public 文件夹下的 image.jpg 可通过 http://localhost:3000/image.jpg 直接访问
// 常用于存放 CSS、JavaScript、图片等不需要服务器动态处理的文件
// app.use(express.static('public'));

// 2. 配置 JSON 解析中间件
// express.json() 用于解析请求体中的 JSON 格式数据
// 作用：将客户端发送的 Content-Type 为 application/json 的请求体解析为 JavaScript 对象，挂载到 req.body 上
// 例如：客户端 POST 发送 { "name": "张三" } 时，可通过 req.body.name 获取值
// 适用于前后端通过 JSON 格式交互数据的场景（如 AJAX、小程序请求等）
// app.use(express.json());

// 3. 配置表单数据解析中间件
// express.urlencoded() 用于解析表单提交的 application/x-www-form-urlencoded 格式数据
// { extended: false } 表示使用 Node 内置的 querystring 模块解析数据（不支持嵌套对象）
// 作用：将表单提交的键值对数据解析为 JavaScript 对象，挂载到 req.body 上
// 例如：表单提交 name=张三&age=20 时，可通过 req.body.name 和 req.body.age 获取值
// 适用于传统 HTML 表单提交或模拟表单格式的请求
// app.use(express.urlencoded({ extended: false }));

// 5. 第三方中间件
// 1. 安装中间件(npm install xxxxx)
// 2. 引入中间件(const 中间件 = require('路径'))
// 3. 注册中间件(app.use())


// 自定义中间件(封装)
// const qs = require('qureystring')
// const m = (req, res, next) => {
//     let str = ''
//     req.on('data',(chuck)=>{
//         str += chuck
//     })
//     req.on('end',()=>{
//         req.body = qs.parse(str)
//         next()
//     })
// }
// module.exports = m

// 在主文件中
// const  m = require('路径')
// app.use(m)
// // app.post('/post',(req,res)=>{
// //     res.send(req.body)
// // })

// 使用cors 中间件 解决跨域问题
// 1. npm install cors
// 2. const cors = require('cors')
// 3. app.use(cors())(在路由之前注册)


// 设置 Access-Control-Allow-Origin 响应头，允许所有来源的跨域请求
// '*' 表示允许任意域名（包括前端页面部署的域名、小程序域名等）发起的跨域请求
// 注意：在生产环境中，若需更严格的安全控制，建议替换为具体允许的域名（如 'https://www.example.com'），避免潜在的安全风险
res.setHeader('Access-Control-Allow-Origin', '*');

// 设置 Access-Control-Allow-Methods 响应头，指定允许的 HTTP 请求方法
// 这里允许了 GET（获取资源）、POST（提交资源）、PUT（修改资源）、DELETE（删除资源）、OPTION（预检请求，浏览器自动发起，用于探测服务器是否允许后续的实际请求 ）
// 当客户端使用非简单请求方法（如 PUT、DELETE 等）时，浏览器会先发送 OPTION 请求，服务器返回允许的方法后，才会发起实际请求
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTION');

// 设置 Access-Control-Allow-Headers 响应头，指定允许的请求头
// 这里允许了 Content-Type 请求头，常用于在请求中声明请求体的数据格式（如 application/json、application/x-www-form-urlencoded 等 ）
// 如果前端请求中还会携带其他自定义请求头（如 Authorization 用于传递令牌 ），需要在这里添加对应的请求头名称，否则浏览器会因跨域限制拦截请求
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

手写的
const express = require('express');
const app = express();

// 全局 CORS 中间件，处理所有请求的预检和响应头
app.use((req, res, next) => {
    // 允许的源（* 表示允许所有，生产环境建议严格限定，如 'https://your-domain.com'）
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许的 HTTP 方法（需包含预检请求的 OPTIONS，以及业务用的方法）
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 允许的请求头（需包含业务中用到的自定义头，如 Authorization、Content-Type 等）
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    // 处理预检请求：直接返回成功（浏览器收到 200/204 即认为预检通过）
    if (req.method === 'OPTIONS') {
        res.status(204).send(); // 204 无内容，简洁响应
        return;
    }

    next(); // 继续处理后续中间件/路由
});

// 示例路由：模拟需要预检的 PUT 请求
app.put('/api/data', (req, res) => {
    res.json({ message: 'PUT 请求成功，已处理业务逻辑' });
});

app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
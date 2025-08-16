const express = require('express')
const app = express()
const router = require('./test3')

// app.use() 注册全局中间件
const m = (req, res, next) => {
    console.log(req.url);
    console.log(Date());
    req.time = Date()
    next()
}
const m1 = (req, res, next) => {
    console.log('这是第二个中间件');
    next()
}

app.use(m,m1)
// app.use(m1)
app.use('/api',router)
app.listen(3001, () => {
    console.log('服务已启动，地址：http://localhost:3001');
})
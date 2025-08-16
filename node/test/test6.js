// const express = require('express')
// const app = express()
// const jwt = require('jsonwebtoken');
// const { expressjwt: expressJWT } = require("express-jwt");

// const secretKey = 'YOUR-secretkey'

// app.use(express.json())

// app.get('/login', (req, res) => {
//     const token = jwt.sign({
//         name: '张三',
//         age: 18
//     }, secretKey, {
//       expiresIn: '1h' // 设置过期时间为1小时
//     })
//    res.status(200).json({
//     code:200,
//     msg:'登录成功',
//     token:token

//    })

// })

// app.listen(8087, () => {
//     console.log('服务器已启动，地址：http://localhost:8087');
// })

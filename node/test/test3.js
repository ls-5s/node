const express = require('express')
const router = express.Router()

const m = (req, res, next) => {
    console.log('这是路由中间件');
    next()
}
const m1 = (req, res, next) => {
    console.log('这是路由中间件2');
    next()
}
router.get('/get', (req, res) => {
    res.send({code:0,msg:'请求成功'})
})
router.post('/post', m,m1, (req, res) => {
    res.send({code:0,msg:'提交成功',req:req.time})
})
module.exports = router
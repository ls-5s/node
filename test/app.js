require('dotenv').config(); // 加载 .env 文件中的环境变量

const { AppDataSource } = require('./data.source')
const express = require('express')
const cors = require('cors')
const app = express()
const { router } = require('./router/test')

app.use(cors())

app.use(express.json())
app.use( router)

AppDataSource.initialize()
 .then(() => {
    console.log('数据库连接成功')
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`服务启动成功http://localhost:${port}`)
    })

 })
 .catch((error) => {
    console.log('数据库连接失败', error)
 })

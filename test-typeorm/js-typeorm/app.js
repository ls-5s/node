const express = require('express')
const app = express()
const {AppDataSource} = require('./routes/data-source')
const {Router} = require('./test/postContent')

app.use(express.json())
app.use('/post',Router)
// 初始化数据库并启动服务器
AppDataSource.initialize()
    .then(() => {
        console.log("数据库连接已建立");

        app.listen(3000, () => {
            console.log(`服务器正在3000端口上运行`);
            console.log(`访问 http://localhost:3000 使用API`);

        });
    })
    .catch((error) => {
        console.error("数据库连接错误:", error);
    });

require('dotenv').config(); // 加载 .env 文件中的环境变量

const { DataSource } = require('typeorm')
const { User } = require('./entity/user')
const { Message } = require('./entity/mess')

require('reflect-metadata')

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'user',
    entities: [User, Message],
    synchronize: true,
})
module.exports = {
    AppDataSource
}

const {Post} = require('../entity/Post')
const {DataSource} = require('typeorm')
require('reflect-metadata')

// TypeORM数据源配置
const AppDataSource = new DataSource({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'123456',
    database:'test',
    entities:[Post],
    // 实际项目中通常用路径匹配（如 entities: ['src/entities/**/*.js']）自动加载所有实体。
    synchronize:true,
    logging:false
})
module.exports = {
    AppDataSource
}


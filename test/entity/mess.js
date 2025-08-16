const { EntitySchema } = require('typeorm')

const Message = new EntitySchema({
    name: 'Message',
    tableName: 'Message',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        sex: {
            type: 'varchar',
            length: 255,
            nullable: false,

            comment: '性别'
        },
        age: {
            type: 'int',
            nullable: false,
            default: 0, // 添加默认值
            comment: '年龄'
        },
       
    },
    relations: {
        User: {
            type: 'many-to-one',
            target: 'User',
            inverseSide: 'Message',
            joinColumn: true,// 关联外键字段,
            onDelete: 'CASCADE'
        }
    }
})
module.exports = {
    Message
}


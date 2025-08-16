const { EntitySchema } = require('typeorm')

const User = new EntitySchema({
    name: 'User',
    tableName: 'User',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,

        },
        name: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
    },
    relations: {
        Message: {
            type: 'one-to-many',
            target: 'Message',
            inverseSide: 'User',
            cascade: true,
          
        },
    }


})
module.exports = {
    User

}

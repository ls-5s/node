const { EntitySchema } = require('typeorm')

const Post = new EntitySchema({
    name: 'Post',
    tableName: 'posts',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        sex: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        age: {
            type: 'int',
            nullable: false
        },
        IDCard: {
            type: 'varchar',
            length: 100,
            nullable: false,
            unique: true
        },
        time: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP'
        }
    },

})


module.exports = {
    Post
}

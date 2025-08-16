const express = require('express')
const router = express.Router()
const { AppDataSource } = require('../data.source')
const { User } = require('../entity/user')
const { Message } = require('../entity/mess')

router.get('/test', async (req, res) => {

    const { name, age, sex } = req.body
    console.log(name, age, sex)

    try {
        const userRepository = AppDataSource.getRepository(User)
        const messageRepository = AppDataSource.getRepository(Message)
        const message = messageRepository.create({
            age: age,
            sex: sex

        })
        const user = userRepository.create({
            name: name,

            Message: [message]
        })

        const user1 = await userRepository.save(user)
        console.log(user1)

        res.status(200).json({  // 注意这里添加了 {
            code: 200,
            msg: 'success',
            data: user1
        });  // 注意这里添加了 }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            msg: 'error',
            data: null
        })

    }
})
router.post('/test', async (req, res) => {
    try {
        const { name } = req.body
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({

            where: {
                name: name
            },
            relations: ['Message']

        })
        await userRepository.delete(user.id)


        console.log(user)

        res.status(200).json({
            code: 200,
            msg: 'success',
            data: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            msg: 'error',
            data: null
        })
    }

})



module.exports = {
    router

}

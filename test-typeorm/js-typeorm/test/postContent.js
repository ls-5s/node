const express = require('express')
const Router = express.Router()
const { Post } = require('../entity/Post')
const { AppDataSource } = require('../routes/data-source')
const {Not, MoreThanOrEqual} = require('typeorm')
Router.post('/post',async (req,res)=>{
    try {
        const {name,sex,age,IDCard} = req.body
      const postRepository = AppDataSource.getRepository(Post)
      const post = postRepository.create({
        name,
        sex,
        age,
        IDCard
      })
      await postRepository.save(post)
      res.status(201).json(post)
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
    }
})

Router.post('/post', async (req, res) => {
    try {
        const { name, sex, age, IDCard } = req.body
      const postRepository = AppDataSource.getRepository(Post)
      const post = postRepository.findOne({
        where:[
            {name:Like("张%")},
            {age:MoreThanOrEqual(18)}

        ],
        select:['name','age'],
        order: {
            age:'ASC',
            IDCard:'DESC'

        },
        skip:0,
        take:10


      })
      

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})


module.exports = {
    Router
}


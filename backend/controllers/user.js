const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Users = require('../models/User')

class Controller {

    async getAllUsers(req, res) {
        res.status(200).send(await Users.find())
    }

    async getUser(req, res) {
        const targetUser = await Users.findById(req.params.id)
        res.status(200).send(targetUser)
    }

    async updateUser(req, res) {
        
        const updQuery = {};
        
        if(req.body.name) {
            updQuery.name = req.body.name
        }
        if(req.body.nickname) {
            updQuery.nickname = req.body.nickname
        }
        if(req.body.surname) {
            updQuery.surname = req.body.surname
        }
        if(req.body.sex) {
            updQuery.sex = req.body.sex
        }
        if(req.body.city) {
            updQuery.city = req.body.city
        }
        if(req.body.country) {
            updQuery.country = req.body.country
        }
        if(req.body.age) {
            updQuery.age = req.body.age
        }
       
        const updUser = await Users.findOneAndUpdate(
            {_id: req.params.id}, 
            updQuery,
            {new: true}
        )
        res.status(201).send(updUser)
    }

    async deleteUser(req, res) {
        //delete user
        const targetUser = await Users.deleteOne({
            _id: req.params.id
        })
        
        res.status(200).send(targetUser)
    }
}

module.exports = Controller;
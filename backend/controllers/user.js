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

    async addUser(req, res) {    
        const user = new Users({
            name: req.body.name,
            nickname: req.body.nickname
        })
        await user.save()
        res.status(201).send(user)
    }

    async updateUser(req, res) {
       
        const updQuery = {};
        if(req.body.name) {
            updQuery.name = req.body.name
        }
        if(req.body.nickname) {
            updQuery.nickname = req.body.nickname
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
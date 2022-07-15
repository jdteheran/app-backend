const express = require('express')
const User = require('../models/user')

const router = express.Router()

//create user
router.post('/users', (request, response) => {
    const user = new User(request.body)

    user
    .save()
    .then(user => response.json(user))
    .catch(error => response.json({ message: error}))
})

//get all users
router.get('/users', async (request, response) => {
    const users = await User.find()
    response.json(users)
})

//get a user
router.get('/users/:id', (request, response) => {
    const { id } = request.params

    User
    .findById(id)
    .then(user => response.json(user))
    .catch(error => response.json({ message: error}))
})

//update a user
router.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age, email } = request.body

    User
    .updateOne({ _id: id }, { $set: {name, age, email} })
    .then(result => response.json(result))
    .catch(error => response.json({ message: error}))
})

//delete a user
router.delete('/users/:id', (request, response) => {
    const { id } = request.params

    User
    .remove({ _id: id})
    .then(result => response.json(result))
    .catch(error => response.json({ message: error}))
})


module.exports = router
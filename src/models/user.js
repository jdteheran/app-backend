const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const User = mongoose.model('users', user_schema)

module.exports = User
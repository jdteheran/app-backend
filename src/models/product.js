const mongoose = require('mongoose')

const product_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('products', product_schema)

module.exports = Product
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    response.json({
        message: 'Bienvenidos'
    })
})

module.exports = router
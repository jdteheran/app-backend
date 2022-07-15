const express = require('express')
require('dotenv').config()
require('./db/connection')
const auth_route = require('./routes/auth')
const index_route = require('./routes/index')
const user_route = require('./routes/user')
const verify_token = require('./routes/verify_token')
const cors = require('cors')

//Settings
const app = express()
const port = process.env.PORT || 9000
const cors_options = {
    origin: '*'
}


//Middlewares
app.use(express.json())
app.use(cors(cors_options))
app.use('/api/user', auth_route)
app.use(verify_token)
app.use('/', index_route)
app.use('/api', user_route)

//Server Listening
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto:', port);
})
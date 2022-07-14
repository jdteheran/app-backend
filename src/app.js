const express = require('express')
require('dotenv').config()
require('./db/connection')
const user_route = require('./routes/user')

//Settings
const app = express()
const port = process.env.PORT || 9000


//Middlewares
app.use(express.json())
app.use('/api', user_route)



//Server Listening
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto:', port);
})
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', (request, response) => {
    User.findOne({ email: request.body.email })
    .then(async result => {
        if (result == null) {

            let body = request.body

            if (body.password) {
                if (body.password.length < 6) return response.json({ message: 'la contraseña debe tener almenos 6 caracteres'})
            }

            const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT))
            const password = await bcrypt.hash(body.password, salt)

            body = {
                ...body,
                password: password
            }

            const user = new User(body)

            user
            .save()
            .then(user => response.json(user))
            .catch(error => response.json({ message: error}))
        } else {
            response.json({ message: 'correo ya registrado'})
        }
    })
    .catch(error => response.json({ message: error}))
})

router.post('/login', (request, response) => {
    User.findOne({ email: request.body.email })
    .then(result => {
        if (result != null) {

            bcrypt.compare(request.body.password, result.password)
            .then(auth => {
                if (auth) {

                    const token = jwt.sign( {
                        name: result.name,
                        id: result._id
                    }, process.env.TOKEN_SECRET, { expiresIn: 3000})

                    response
                    .header('auth-token', token)
                    .json({ message: 'usuario autenticado'})  

                } else {
                    response.json({ message: 'contraseña incorrecta'})
                }
            })
            .catch(error => response.json({ message: error}))

        } else {
            response.json({ message: 'el correo no se encuentra asociado a ninguna cuenta'})
        }
    })
    .catch(error => response.json({ message: error}))
})

module.exports = router
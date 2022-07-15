const jwt = require('jsonwebtoken')

const verify_token = (request, response, next) => {
    const token = request.header('token')

    if (!token) return response.status(404).json({ error: 'No existe token en la peticion'})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        request.user = verified
        next()
    } catch (error) {
        return response.status(404).json({ error: 'Token invalido'})
    }
}

module.exports = verify_token
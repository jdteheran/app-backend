const request = require('supertest')
const { app } = require('../app') 
const mongoose = require('mongoose')

beforeAll( done => {
    done()
})

afterAll( done => {
    mongoose.connection.close()
    done()
})

describe('Obtener respuestas erroneas al recuerso de bienvenida', () => {
    test('repuesta 404 estado de la peticion', async () => {
        const response = await request(app)
            .get('/')
            .send()

        expect(response.statusCode).toBe(404)
    })

    test('respuesta de error no existe token', async () => {
        const response = await request(app)
            .get('/')
            .send()

        expect(response.body.error).toBe('No existe token en la peticion')
    })

    test('respuesta de error token invalido', async () => {
        const response = await request(app)
            .get('/')
            .set({ token: "token"})
            .send()

        expect(response.body.error).toBe('Token invalido')
    })

})

describe('Obtener respuestas exitosas de Bienvenido', () => {
    test('respuesta 200 al registrar un usuario', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                name: "test",
                email: "test@uninorte.edu.co",
                password: "test"
            })

        expect(response.statusCode).toBe(200)
    })

    test('verificaicon usuario registrado', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                name: "test",
                email: "test@uninorte.edu.co",
                password: "password"
            })

        const { message, _id } = response.body

        if (message) {
            expect(message).toBe('correo ya registrado')
        } else {
            expect(_id).toBeDefined();
        }
    })

    test('obtener token (login exitoso)', async () => {
        const response = await request(app)
            .post('/api/user/login')
            .send({
                email: "test@uninorte.edu.co",
                password: "password"
            })

        expect(response.statusCode).toBe(200)

        const { message } = response.body

        expect(message).toBe('usuario autenticado')

        token = response.headers['auth-token']
    })

    test('obtener mensaje de bienvenida', async () => {
        const response = await request(app)
            .get('/')
            .set({ token: token})
            .send()

        const { message } = response.body

        expect(message).toBe('Bienvenidos')
   
    })

})
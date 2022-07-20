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

describe('Testeo endpoints rutas de usuarios (CRUD)', () => {

    test('login exitoso', async () => {
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


    test('repuesta 200 creacion usuario', async () => {
        const response = await request(app)
            .post('/api/users')
            .set({ token })
            .send({
                name: "test",
                email: "test@uninorte.edu.co",
                password: "password"
            })

        _id  = response.body._id

        expect(response.statusCode).toBe(200)
        expect(_id).toBeDefined()
    })

    test('obtener todos los usuarios', async () => {
        const response = await request(app)
            .get('/api/users')
            .set({ token })
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    test('obtener un usuario especifico por id en la url', async () => {
        const response = await request(app)
            .get(`/api/users/${_id}`)
            .set({ token })
            .send()

        expect(response.statusCode).toBe(200)
        
        const { email } = response.body

        expect(email).toBe('test@uninorte.edu.co')
    })
})
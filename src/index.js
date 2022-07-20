const { app, port } = require('./app')

//Server Listening
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto:', port);
})
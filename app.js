const express = require('express');
const app = express()
const { Server } = require('socket.io')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('ok')
})

let dataCompleta = [];

const httpServer = app.listen(8080, () =>  console.log('Server running on port 8080'))

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    io.sockets.emit('messages', dataCompleta)
    
    socket.on('message', data => {
        dataCompleta.push(data)
        io.sockets.emit('messages', dataCompleta)
    })
})

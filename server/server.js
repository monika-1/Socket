const {instrument} = require('@socket.io/admin-ui')

const io = require('socket.io')(3000, {
    cors: { 
        origin: ['http://localhost:8080', 'https://admin.socket.io/']
    }
}) 

const userIo = io.of('/user')
userIo.on('connection', socket => {
    console.log('Connected to user namespace with username: ' +  socket.username)
})

userIo.use((socket, next) => {
    if( socket.handshake.auth.token) {
        socket.username = getUserNameFromToken(socket.handshake.auth.token)
        next()
    } else {
        next(new Error('Please send a token'))
    }
})

function getUserNameFromToken(token) {
    return token
}

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('send-message', (message, room) => {
        if(room === '') {
            socket.broadcast.emit('receive-message', message)
        } else {
            socket.to(room).emit('receive-message', message)
        }
        
    })
    socket.on('join-room', (room, cb) => {
        socket.join(room)
        cb(`Joined ${room}`)
    })
    socket.on('ping', num => {
        console.log(num)
    })
})

instrument(io, {auth: false})
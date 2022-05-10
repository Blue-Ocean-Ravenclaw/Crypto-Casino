import {
  Server
} from 'Socket.IO'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('send-msg', msg => {
        socket.broadcast.emit('send-msg', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
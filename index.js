const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 5000

app.get("/", function(req, res) {
  res.send("Hello world!!!")
})

io.on('connection', socket => {
  const { id } = socket.client
  // console.log(`User connected: ${id}`)
  socket.on('chat message', ({ nickname, msg }) => {
    console.log(`${nickname}: ${msg}`)
    io.emit('chat message', { nickname, msg})
  })
})

server.listen(port, () => console.log(`Listen on *: ${port}`))
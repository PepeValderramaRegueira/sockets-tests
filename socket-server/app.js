const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const socketIO = require("socket.io")

const io = socketIO(server)

io.on('connection', (client) => {
  console.log('Someone connected to the server :O')

  client.on('message', (data) => {
    client.broadcast.emit('message', data )
    client.emit('message', data )
  })

  client.on('disconnect', () => {
    console.log("disconnected")
  })
})

server.listen(5001, (err) => {
  if (err) throw new Error(err)
})

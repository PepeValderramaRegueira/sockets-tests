const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const socketIO = require("socket.io")
const { Users } = require("./classes/Users")

const io = socketIO(server)
let onlineUsers = new Users()

io.on('connection', (client) => {
  console.log('Someone connected to the server :O')

  client.on('user-connect', (user, cb) => {
    let users = onlineUsers.addUser(client.id, user)
    client.broadcast.emit('new-user-connected', users)
    cb(users)
  })

  client.on('message', (newMessage) => {
    client.broadcast.emit('message', {
      user: onlineUsers.getUserInfo(client.id).user.name,
      text: newMessage.text
    })
    client.emit('message', {
      user: onlineUsers.getUserInfo(client.id).user.name,
      text: newMessage.text
    })
  })

  client.on('disconnect', async () => {
    let userDisconnected = await onlineUsers.removeUser(client.id)
    console.log("THE USERS THAT STILL ONLINE", onlineUsers.getUsers())
    client.broadcast.emit('user-disconnected', {
      disconnectedUser: userDisconnected,
      users: onlineUsers.getUsers()
    })
  })
})

server.listen(5001, (err) => {
  if (err) throw new Error(err)
})

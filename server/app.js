require("dotenv").config()
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const socketIO = require("socket.io")
const path = require("path")

const port = process.env.PORT

const publicPath = path.resolve(__dirname, "../client")
app.use(express.static(publicPath))

module.exports.io = socketIO(server)
require("./sockets/sockets")

server.listen(port, (err) => {
  if (err) throw new Error(err)
  console.log(`Server listening on http://localhost:${port}`)
})

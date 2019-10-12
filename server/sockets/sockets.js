const {io} = require("../app")

io.on('connection', (client) => {
  console.log('Someone connected')
  
  // Listen the client
  client.on('greet', (message) => {
    console.log(message)
  })

  client.on('message', (message, cb) => {
    console.log("Someone is sending messages")

    client.broadcast.emit('message', message)

    // if (message.user) {
    //   cb({
    //     serverResponse: 'Data sent from a user'
    //   })
    // } else {
    //   cb({
    //     serverResponse: 'Data sent from an anonymus person'
    //   })
    // }
  })

  // Send to the client
  client.emit('i-see-you', {
    message: 'I seeeeee youuuuuuu'
  })
  
  client.on('disconnect', () => {
    console.log('Someone disconnected')
  })
})
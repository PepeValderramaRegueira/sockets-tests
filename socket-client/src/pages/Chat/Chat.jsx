import React, { Component } from 'react'
import io from 'socket.io-client'
import './Chat.css'

export default class Chat extends Component {
  constructor() {
    super()
    this.socket = io("http://localhost:5001")
    this.state = {
      message: '',
      messages: [],
      onlineUsers: []
    }
  }
  
  render() {
    return (
      <section className="chat-section">
        <h1>This is the chat</h1>
        <div className="online-users">
          {
            this.state.onlineUsers.length > 0
              ? this.renderOnlineUsers()
              : <p>There are no online users</p>
          }
        </div>
        <div className="chat">
          <div className="chat-messages">
            {
              this.state.messages.length === 0
                ? this.renderNoMessages()
                : this.renderMessages()
            }
          </div>
          <form className="chat-input" onSubmit={(event) => this.sendMessage(event)}>
            <div className="field">
              <input type="text" value={this.state.message} autoComplete="off" onChange={(event) => this.handleInputChange(event)} name="message" placeholder="Type your message..."/>
            </div>
          </form>
        </div>
      </section>
    )
  }

  componentDidMount() {
    this.socket.emit('user-connect', {
      name: this.props.match.params.user 
    }, (currentOnlineUsers) => {
      this.setState({
        ...this.state,
        onlineUsers: currentOnlineUsers
      })
    })
    
    this.socket.on('new-user-connected', (onlineUsers) => {
      this.setState({
        ...this.state,
        onlineUsers: onlineUsers
      })
    })

    this.socket.on('user-disconnected', (data) => {
      console.log("The users that still online", data)
      console.log("User disconnected:", data.disconnectedUser)
      this.setState({
        ...this.state,
        onlineUsers: data.users
      })
    })

    this.socket.on('message', (newMessage) => {
      let newMessages = [...this.state.messages]
      newMessages.push(newMessage)
      this.setState({
        ...this.state,
        messages: newMessages
      })
    })
  }

  renderOnlineUsers() {
    return (
      <ul className="online-users">
        {
          this.state.onlineUsers.map((onlineUser, idx) => {
            return <li key={idx}>{onlineUser.user.name}</li>
          })
        }
      </ul>
    )
  }

  renderNoMessages = () => {
    return (
      <div className="no-messages">
        <p>There are no messages</p>
      </div>
    )
  }

  renderMessages = () => {
    console.log("THE MESSAGES", this.state.messages)
    return (
      this.state.messages.map((message, idx) => {
        return (
          <div className="message" key={idx}>
            <p className="message-text">
              <strong>{message.user}</strong>
              {message.text}
            </p>
          </div>
        )
      })
    )
  }

  handleInputChange = (event) => {
    this.setState({
      ...this.state,
      message: event.target.value
    })
  }

  sendMessage = (event) => {
    event.preventDefault()
    if (this.state.message.trim().length > 0) {
      this.socket.emit('message', {
        text: this.state.message
      })
      this.setState({
        ...this.state,
        message: ''
      })
    }
  }

  componentWillUnmount() {
    this.socket.off('message')
  }
}

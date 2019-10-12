import React, { Component } from 'react'
import io from 'socket.io-client'
import './Chat.css'

export default class Chat extends Component {
  constructor() {
    super()
    this.socket = io("http://localhost:5001")
    this.state = {
      message: '',
      messages: []
    }
  }
  
  render() {
    return (
      <section className="chat-section">
        <h1>This is the chat</h1>
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
    this.socket.on('message', (data) => {
      let newMessages = [...this.state.messages]
      newMessages.push(data)
      this.setState({
        ...this.state,
        messages: newMessages
      })
    })
  }

  renderNoMessages = () => {
    return (
      <div className="no-messages">
        <p>There are no messages</p>
      </div>
    )
  }

  renderMessages = () => {
    return (
      this.state.messages.map((message, idx) => {
        return (
          <div className="message" key={idx}>
            <p className="message-text">{message.message}</p>
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
        message: this.state.message
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

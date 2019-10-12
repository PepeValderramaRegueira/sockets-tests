import React, { Component } from 'react'
// import * as socket from './socket'
import Chat from './pages/Chat/Chat'
import io from 'socket.io-client'
import Navbar from './components/Navbar/Navbar'
import {Route, Switch} from 'react-router-dom'
import Home from './pages/Home/Home'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.socket = io("http://localhost:5001")
  }
  
  render() {
    return (
      <div>
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.socket.on('message', (data) => {
      console.log('Data revieved', data)
    })
  }

  sendData = (data) => {
    this.socket.emit('message', {
      test: 'Holy moly'
    })
  }
}

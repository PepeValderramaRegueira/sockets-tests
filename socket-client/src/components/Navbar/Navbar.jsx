import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/chat">Chat</NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

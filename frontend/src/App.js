import React, { Component } from 'react'
import './App.css'

import styled from 'styled-components'

import LoginUser from './components/LoginUser'
import LogoutUser from './components/LogoutUser'
import RegUser from './components/RegUser.js'
import MovieList from './components/MovieList'

const UserHeader = styled.h3`
  font-size: 0.8em;
  margin-left: 20px;
`

class App extends Component {
  constructor (props) {
    super(props)
    this.onAuthChangeCallback = this.onAuthChangeCallback.bind(this)
    this.state = { reload: false }
  }

  onAuthChangeCallback () {
    this.setState({ reload: !this.state.reload })
  }

  render () {
    return (
      <div>
        {localStorage.token !== undefined ? <UserHeader>User: {localStorage.username}</UserHeader> : ''}
        {localStorage.token !== undefined ? <LogoutUser authChangeCallback={this.onAuthChangeCallback} /> : ''}
        {localStorage.token !== undefined ? <MovieList /> : <LoginUser authChangeCallback={this.onAuthChangeCallback} />}
        {localStorage.token !== undefined ? '' : <RegUser />}
      </div>
    )
  }
}

export default App
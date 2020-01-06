import React, { Component } from 'react'
import './App.css'

import styled from 'styled-components'

import LoginUser from './components/LoginUser'
import MovieList from './components/MovieList'

const UserHeader = styled.h3`
  font-size: 0.8em;
  margin-left: 20px;
`

class App extends Component {
  constructor (props) {
    super(props)
    this.onLogginCallback = this.onLogginCallback.bind(this)
    this.state = { reload: false }
  }

  onLogginCallback () {
    this.setState({ reload: true })
  }

  render () {
    return (
      <div>
        {localStorage.token !== undefined ? <UserHeader>User: {localStorage.username}</UserHeader> : ''}
        {localStorage.token !== undefined ? <MovieList /> : <LoginUser logginCallback={this.onLogginCallback} />}
      </div>
    )
  }
}

export default App
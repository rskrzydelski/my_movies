import React, { Component } from 'react'

import { logoutUrl } from '../api_helper/routes'
import * as api from '../api_helper/api'

import styled from 'styled-components'

const Button = styled.button`
  background: #232632;
  color: #00a7fa;
  width: 5%;
  height: 20px;
  font-size: 0.9em;
  border: 2px;
  margin-top: 7px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  &:hover { background: #555; }
`

class LogoutUser extends Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  async handleLogout () {
    const { authChangeCallback } = this.props
    localStorage.clear()
    const status = await api.post(logoutUrl(), {})
    console.log(status)
    if (authChangeCallback !== undefined) {
      authChangeCallback()
    }
  }

  render () {
    return (
      <div>
        <Button onClick={this.handleLogout}>Logout</Button>
      </div>
    )
  }
}

export default LogoutUser

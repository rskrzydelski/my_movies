import React, { Component } from 'react'

import styled from 'styled-components'

import * as api from '../api_helper/api'
import { loginUrl } from '../api_helper/routes'

const LoginHeader = styled.h4`
  text-align: center;
  margin-right: 20px;
`
const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`

const TextInput = styled.input`
  padding: 5px;
  font-size: .7em;
  background: #232632;
  color: #d3d4d6;
  width: 100%;
  margin-right: 7px;
  margin-bottom: 10px;
  border: 0px;
  -webkit-apperance: none;
`

const Button = styled.button`
  background: #232632;
  color: #00a7fa;
  width: 30%;
  height: 32px;
  font-size: 0.9em;
  border: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  display: block;
  max-width: 300px;
  margin: auto;
  justify-content: center;
  align-items: center;
  &:hover { background: #555; }
`

class LoginUser extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      credentials: { username: '', password: '', email: '' }
    }
  }

  async handleLogin (event) {
    const { authChangeCallback } = this.props
    const user = await api.post(loginUrl(), this.state.credentials)
    if (user.key !== undefined) {
      localStorage.setItem('token', user.key)
      localStorage.setItem('username', this.state.credentials.username)
      if (authChangeCallback !== undefined) {
        authChangeCallback()
      }
    } else {
      localStorage.clear()
    }
    this.setState({
      credentials: { username: '', password: '', email: '' }
    })
  }

  handleChange (event) {
    const cr = this.state.credentials
    cr[event.target.name] = event.target.value
    this.setState({ credentials: cr })
  }

  render () {
    return (
      <Container>
        <LoginHeader>Login</LoginHeader>
        <label>
          Username:
          <TextInput
            type='text'
            name='username'
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <TextInput
            type='email'
            name='email'
            value={this.state.credentials.email}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <TextInput
            type='password'
            name='password'
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
        </label>
        <Button onClick={this.handleLogin}>Login</Button>
      </Container>
    )
  }
}

export default LoginUser
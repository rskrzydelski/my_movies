import React, { Component } from 'react'

import styled from 'styled-components'

import * as api from '../api_helper/api'
import { registerUrl } from '../api_helper/routes'

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

class RegUser extends Component {
  constructor (props) {
    super(props)
    this.handleReg = this.handleReg.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      register_data: { username: '', email: '', password1: '', password2: '' }
    }
  }

  async handleReg (event) {
    const regUser = await api.post(registerUrl(), this.state.register_data)
    regUser.key !== undefined ? alert('User registered successfully') : alert('Register error')
    this.setState({
      register_data: { username: '', email: '', password1: '', password2: '' }
    })
  }

  handleChange (event) {
    const r = this.state.register_data
    r[event.target.name] = event.target.value
    this.setState({ register_data: r })
  }

  render () {
    return (
      <Container>
        <LoginHeader>Registration</LoginHeader>
        <label>
          Username:
          <TextInput
            type='text'
            name='username'
            value={this.state.register_data.username}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <TextInput
            type='email'
            name='email'
            value={this.state.register_data.email}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Password1:
          <TextInput
            type='password'
            name='password1'
            value={this.state.register_data.password1}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password2:
          <TextInput
            type='password'
            name='password2'
            value={this.state.register_data.password2}
            onChange={this.handleChange}
          />
        </label>
        <Button onClick={this.handleReg}>Register</Button>
      </Container>
    )
  }
}

export default RegUser

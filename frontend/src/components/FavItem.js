import React, { Component } from 'react'
import styled from 'styled-components'

import * as api from '../api_helper/api'
import { favMovieDelete } from '../api_helper/routes'

const Button = styled.button`
  background: #00a7fa;
  color: black;
  width: 100px;
  height: 28px;
  font-size: 1.0em;
  border: 0px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  &:hover { background: #555; }
`

const Container = styled.div`
  justify-content: space-between;
  border: 2px solid #343744;
  background: #232632;
  border-radius: 10px;
  padding: 5px;
`

const Paragraph = styled.p`
  margin-bottom: 1px;
  margin-top: 1px;
`

class FavItem extends Component {
  constructor (props) {
    super(props)
    this.handleRmFromFavReq = this.handleRmFromFavReq.bind(this)
    this.state = {
      fav: []
    }
  }

  async handleRmFromFavReq () {
    const { favChangeCallback } = this.props
    const { fav } = this.state
    const status = await api.authDelete(favMovieDelete(fav.id))
    if (favChangeCallback !== undefined) {
      favChangeCallback(fav)
    }
  }

  componentDidMount () {
    const { fav } = this.props
    this.setState({
      fav: fav
    })
  }

  render () {
    const { fav } = this.state
    return (
      <Container>
        <Paragraph>Title: {fav.title}</Paragraph>
        <Paragraph>Type: {fav.type}</Paragraph>
        <Paragraph>Year: {fav.year}</Paragraph>
        <Paragraph>imdbID {fav.imdbID}</Paragraph>
        <Button onClick={this.handleRmFromFavReq}>Remove -</Button>
      </Container>
    )
  }
}

export default FavItem

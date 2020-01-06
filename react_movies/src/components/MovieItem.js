import React, { Component } from 'react'
import styled from 'styled-components'

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

class MovieItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: null,
      year: null,
      type: null,
      imdbID: null
    }
  }

  componentDidMount () {
    const { title, year, type, imdbID } = this.props
    this.setState({
      title: title,
      year: year,
      type: type,
      imdbID: imdbID
    })
  }

  render () {
    const { title, year, type, imdbID } = this.state
    return (
      <Container>
        <Paragraph>Movie title: {title}</Paragraph>
        <Paragraph>Year: {year}</Paragraph>
        <Paragraph>Type: {type}</Paragraph>
        <Paragraph>imdbID: {imdbID}</Paragraph>
        <Button>favorites +</Button>
      </Container>
    )
  }
}

export default MovieItem
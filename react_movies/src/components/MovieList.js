import React, { Component } from 'react'

import MovieItem from './MovieItem.js'
import movie_json from '../fake_json/m_list.json'
import styled from 'styled-components'

const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`

const Header = styled.h1`
  color: #fff;
`

class MovieList extends Component {
  static defaultProps = {
      movies: [],
  }
  constructor (props) {
    super(props)
    this.clearList = this.clearList.bind(this)
    this.state = {
        movies: []
    }
  }

  clearList () {
      this.setState({
          movies: []
      })
  }

  componentDidMount () {
    fetch('http://127.0.0.1:8000/api/v1/movies/?title=batman&year=2005')
      .then(response => response.json())
      .then(json => this.setState({movies: json}))
  }

  render () {
    const { movies } = this.state
    return (
      <Container>
        <Header>Movie list from omdbapi</Header>
        <button onClick={this.clearList}>Clear list</button>
        <button>Refresh list</button>
        {movies.results !== undefined ? movies.results.map(item =>
        <MovieItem
        title={item.Title}
        type={item.Type}
        year={item.Year}
        imdbID={item.imdbID} />) : ''}
      </Container>
    )
  }
}

export default MovieList

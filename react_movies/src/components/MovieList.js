import React, { Component } from 'react'

import MovieItem from './MovieItem.js'
import { movieByTitleYearApiUrl } from '../api_helper/routes'
import * as api from '../api_helper/api'

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
    this.updateTitle = this.updateTitle.bind(this)
    this.updateYear = this.updateYear.bind(this)
    this.getMovies = this.getMovies.bind(this)

    this.state = {
      movies: [],
      draftTitle: '',
      draftYear: ''
    }
  }

  updateTitle (event) {
      this.setState({draftTitle: event.target.value})
  }

  updateYear (event) {
      this.setState({draftYear: event.target.value})
  }

  async getMovies () {
    const title = this.state.draftTitle
    const year = this.state.draftYear

    this.setState({movies: []})

    const data = await api.get(movieByTitleYearApiUrl(title, year))
    this.setState({
        movies: data,
        draftTitle: '',
        draftYear: '',
    })
  }

  clearList () {
      this.setState({
          movies: []
      })
  }

  render () {
    const { movies } = this.state
    const { next,  previous} = movies
    return (
      <Container>
        <Header>Movie list from omdbapi</Header>
        <label for="title">Title</label><br></br>
        <input type='text' name="Title" id="title" value={this.state.draftTitle} onChange={this.updateTitle}/><br></br>

        <label for="year">Year</label><br></br>
        <input type='text' name="Year" id="year" value={this.state.draftYear} onChange={this.updateYear}/><br></br>
        <button onClick={this.getMovies}>request movies</button>

        <button onClick={this.clearList}>Clear list</button><br></br>
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

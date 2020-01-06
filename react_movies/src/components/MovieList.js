import React, { Component } from 'react'

import MovieItem from './MovieItem.js'
import { movieByTitleYearApiUrl, favMovie } from '../api_helper/routes'
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

const TextInput = styled.input`
  padding: 5px;
  font-size: .7em;
  background: #232632;
  color: #d3d4d6;
  width: 100%;
  margin-right: 7px;
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
  justify-content: center;
  align-items: center;
  &:hover { background: #555; }
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
    this.refreshMovies = this.refreshMovies.bind(this)
    this.getFav = this.getFav.bind(this)
    this.createFav = this.createFav.bind(this)

    this.state = {
      movies: [],
      draftTitle: '',
      draftYear: '',
    }
  }

  updateTitle (event) {
      this.setState({draftTitle: event.target.value})
  }

  updateYear (event) {
      this.setState({draftYear: event.target.value})
  }

  async refreshMovies (url) {
    this.setState({movies: []})
    const data = await api.get(url)
    this.setState({movies: data})
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

  async getFav () {
      this.setState({movies: []})
      const data = await api.get(favMovie())
      this.setState({movies: data})
  }

  clearList () {
      this.setState({
          movies: []
      })
  }

  createFav (params) {
//    api.post(favMovie(), {})
  }

  render () {
    const { movies } = this.state

    return (
      <Container>
        <Header>Movie list from omdbapi</Header>
        <label for="title">Title</label><br></br>
        <TextInput type='text' name="Title" id="title" value={this.state.draftTitle} onChange={this.updateTitle}/><br></br>

        <label for="year">Year</label><br></br>
        <TextInput type='text' name="Year" id="year" value={this.state.draftYear} onChange={this.updateYear}/><br></br>
        <Button onClick={this.getMovies}>request movies</Button>

        <Button onClick={this.clearList}>Clear list</Button>
        <Button onClick={this.getFav}>Favorites</Button><br></br>

        {movies.results !== undefined ? movies.results.map(item =>
        <MovieItem
        title={item.Title}
        type={item.Type}
        year={item.Year}
        imdbID={item.imdbID} />) : ''
        }

        { movies.previous !==  undefined && movies.previous !== null && <Button onClick={() => {this.refreshMovies(movies.previous)}}>Previous</Button>}
        { movies.next !==  undefined && movies.next !== null && <Button onClick={() => {this.refreshMovies(movies.next)}}>Next</Button>}
      </Container>
    )
  }
}

export default MovieList

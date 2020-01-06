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
    this.updateTitle = this.updateTitle.bind(this)
    this.updateYear = this.updateYear.bind(this)
    this.newQuery = this.newQuery.bind(this)

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

  newQuery () {
    const title = this.state.draftTitle
    const year = this.state.draftYear
    let url = 'http://127.0.0.1:8000/api/v1/movies/?'
    let query = ''
    if (title !== '') {
      query = 'title='
      query += title
    }
    if (year !== '') {
        query !== '' ? query+='&' : query+=''
        query += 'year='
        query += year
    }

    url += query

    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({
        movies: json,
        draftTitle: '',
        draftYear: '',
    }))
  }

  clearList () {
      this.setState({
          movies: []
      })
  }

  render () {
    const { movies } = this.state
    return (
      <Container>
        <Header>Movie list from omdbapi</Header>
        <label for="title">Title</label><br></br>
        <input type='text' name="Title" id="title" value={this.state.draftTitle} onChange={this.updateTitle}/><br></br>

        <label for="year">Year</label><br></br>
        <input type='text' name="Year" id="year" value={this.state.draftYear} onChange={this.updateYear}/><br></br>
        <button onClick={this.newQuery}>request movies</button>

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

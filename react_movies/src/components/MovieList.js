import React, { Component } from 'react'

import MovieItem from './MovieItem.js'
import movie_json from '../fake_json/m_list.json'

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
      <div>
        <h1>Movie list from omdbapi</h1>
        <button onClick={this.clearList}>Clear list</button>
        <button>Refresh list</button>
        {movies.results !== undefined ? movies.results.map(item => <MovieItem movieRecord={item} />) : ''}
      </div>
    )
  }
}

export default MovieList

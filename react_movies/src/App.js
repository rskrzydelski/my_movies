import React, { Component } from 'react'
import './App.css'

import MovieList from './components/MovieList'

class App extends Component {
  render () {
    return (
      <div>
        <MovieList />
      </div>
    )
  }
}

export default App
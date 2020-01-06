import React, { Component } from 'react'

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
      <div>
        <h3>Movie title: {title}</h3>
        <h4>Year: {year}</h4>
        <h4>Type: {type}</h4>
        <h4>imdbID: {imdbID}</h4>
        <hr></hr>
      </div>
    )
  }
}

export default MovieItem
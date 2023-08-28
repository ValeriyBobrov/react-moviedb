import React from 'react'
import { Spin, Empty } from 'antd'

import MovieItem from '../movie-item'

import './movieList.css'

function MovieList(props) {
  const { movieData, loading, guestToken } = props

  if (movieData.length === 0) {
    return <Empty description="No movies found or search input empty" />
  }

  if (loading) {
    return <Spin size="large" />
  }

  const movieElements = movieData.map((item) => (
    <MovieItem
      key={item.id}
      id={item.id}
      title={item.title}
      releaseDate={item.release_date}
      overview={item.overview}
      posterPath={item.poster_path}
      voteAverage={item.vote_average}
      genreIds={item.genre_ids}
      guestToken={guestToken}
      rating={item.rating}
    />
  ))

  return <main className="main">{movieElements}</main>
}

export default MovieList

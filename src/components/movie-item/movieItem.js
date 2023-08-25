import React, { Component } from 'react'
import { Card, Rate } from 'antd'
import { parse, format } from 'date-fns'

import MovieService from '../../services/movie-service'
import './movieItem.css'
import noImage from '../../img/no-image.jpg'
import FilmTags from '../film-tags'

export default class MovieItem extends Component {
  state = {
    voteValue: 0,
  }

  movieService = new MovieService()

  handleRatingChange = async (newRating) => {
    try {
      const { id, guestToken } = this.props
      await this.movieService.postRatedMovie(newRating, id, guestToken)
      this.setState({
        voteValue: newRating,
      })
    } catch (error) {
      throw new Error('Error while updating rating:', error)
    }
  }

  overviewCheck(overview) {
    if (overview.length > 140) {
      const trimmedOverview = overview.substring(0, 140)
      const lastSpaceIndex = trimmedOverview.lastIndexOf(' ')

      if (lastSpaceIndex !== -1) {
        const truncatedOverview = trimmedOverview.substring(0, lastSpaceIndex)
        return `${truncatedOverview} ...`
      }
    }
    return overview
  }

  render() {
    const { id, title, releaseDate, overview, posterPath, voteAverage, genreIds, rating } = this.props

    const { voteValue } = this.state

    const roundedVoteAverage = Math.round(voteAverage * 10) / 10

    let borderColor = ''
    if (voteAverage >= 0 && voteAverage < 3) {
      borderColor = '#E90000'
    } else if (voteAverage >= 3 && voteAverage < 5) {
      borderColor = '#E97E00'
    } else if (voteAverage >= 5 && voteAverage < 7) {
      borderColor = '#E9D100'
    } else {
      borderColor = '#66E900'
    }

    const borderStyle = {
      border: `2px solid ${borderColor}`,
    }

    if (!releaseDate) {
      return null
    }

    const formattedReleaseDate = format(parse(releaseDate, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')

    const imageUrl = posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : noImage

    return (
      <Card key={id}>
        <div className="movie-item">
          <img className="movie-item__img" src={imageUrl} alt={`pic ${title}`} width={180} height={280} />
          <div className="movie-item__desc">
            <h1 className="title" value={title}>
              {title}
            </h1>
            <div className="vote" style={borderStyle}>
              <span>{roundedVoteAverage}</span>
            </div>
            <FilmTags className="film-tag" genreIds={genreIds} />
            <p className="releaseDate" value={releaseDate}>
              {formattedReleaseDate}
            </p>
            <p className="overview" value={overview}>
              {this.overviewCheck(overview)}
            </p>
            <Rate
              className="rate"
              count={10}
              defaultValue={voteValue}
              value={rating || voteValue}
              onChange={rating ? null : this.handleRatingChange}
            />
          </div>
        </div>
      </Card>
    )
  }
}

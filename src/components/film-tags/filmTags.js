import React from 'react'

import { Consumer } from '../../services/genre-context'
import './filmTags.css'

function FilmTags(props) {
  const { genreIds } = props

  return (
    <Consumer>
      {(genres) => {
        const genreSpans = genreIds.map((id) => {
          const genre = genres.find((genreList) => genreList.id === id)
          if (genre) {
            return (
              <span key={genre.id} className="genre-span">
                {genre.name}
              </span>
            )
          }
          return null
        })

        return <div className="genre-tags">{genreSpans}</div>
      }}
    </Consumer>
  )
}

export default FilmTags

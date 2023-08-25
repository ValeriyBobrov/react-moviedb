import React, { Component } from "react";
import { Consumer } from "../../services/genre-context";
import "./filmTags.css";

export default class FilmTags extends Component {
  render() {
    const { genreIds } = this.props;

    return (
      <Consumer>
        {(genres) => {
          const genreSpans = genreIds.map((id) => {
            const genre = genres.find((genre) => genre.id === id);
            if (genre) {
              return (
                <span key={genre.id} className="genre-span">
                  {genre.name}
                </span>
              );
            }
            return null;
          });

          return <div className="genre-tags">{genreSpans}</div>;
        }}
      </Consumer>
    );
  }
}

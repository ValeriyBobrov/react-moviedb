import React, { Component } from "react";
import MovieItem from "../movie-item";
import "./movieList.css";
import { Spin, Empty } from "antd";

export default class MovieList extends Component {
  render() {
    const { movieData, loading } = this.props;

    if (movieData.length === 0) {
      return <Empty description="No movies found" />;
    }

    if (loading) {
      return <Spin size="large" />;
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
        guestToken={this.props.guestToken}
        rating={item.rating}
      />
    ));

    return <main className="main">{movieElements}</main>;
  }
}

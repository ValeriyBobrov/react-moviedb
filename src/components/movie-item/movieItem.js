import React, { Component } from "react";
import { Card } from "antd";
import { parse, format } from "date-fns";
import "./movieItem.css";
import noImage from "../../img/no-image.jpg";

export default class MovieItem extends Component {
  overviewCheck(overview) {
    if (overview.length > 200) {
      const trimmedOverview = overview.substring(0, 200);
      const lastSpaceIndex = trimmedOverview.lastIndexOf(" ");

      if (lastSpaceIndex !== -1) {
        const truncatedOverview = trimmedOverview.substring(0, lastSpaceIndex);
        return `${truncatedOverview} ...`;
      }
    }
    return overview;
  }

  render() {
    const { id, title, releaseDate, overview, posterPath, voteAverage } =
      this.props;

    const roundedVoteAverage = Math.round(voteAverage * 10) / 10;

    let borderColor = "";
    if (voteAverage >= 0 && voteAverage < 3) {
      borderColor = "#E90000";
    } else if (voteAverage >= 3 && voteAverage < 5) {
      borderColor = "#E97E00";
    } else if (voteAverage >= 5 && voteAverage < 7) {
      borderColor = "#E9D100";
    } else {
      borderColor = "#66E900";
    }

    const borderStyle = {
      border: `2px solid ${borderColor}`,
    };

    if (!releaseDate) {
      return null;
    }
    const formattedReleaseDate = format(
      parse(releaseDate, "yyyy-MM-dd", new Date()),
      "MMMM d, yyyy"
    );
    const imageUrl = posterPath
      ? `https://image.tmdb.org/t/p/w200${posterPath}`
      : noImage;
    return (
      <Card key={id}>
        <div className="movie-item">
          <img
            className="movie-item__img"
            src={imageUrl}
            alt={`pic ${title}`}
            width={180}
            height={280}
          />
          <div className="movie-item__desc">
            <h1 className="title" value={title}>
              {title}
            </h1>
            <div className="vote" style={borderStyle}>
              <span>{roundedVoteAverage}</span>
            </div>
            <p className="film-tag">### ###</p>
            <p className="releaseDate" value={releaseDate}>
              {formattedReleaseDate}
            </p>
            <p className="overview" value={overview}>
              {this.overviewCheck(overview)}
            </p>
          </div>
        </div>
      </Card>
    );
  }
}

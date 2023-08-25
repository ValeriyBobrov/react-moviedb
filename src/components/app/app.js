import React, { Component } from "react";
import MovieService from "../../services/movie-service";
import MovieList from "../movie-list";
import HeaderSearchBar from "../header-search-bar";
import "./app.css";
import { Alert, Pagination, Tabs } from "antd";
import { Provider } from "../../services/genre-context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
      movieData: [],
      ratedMovieData: [],
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 1,
      searchValue: "",
      genres: null,
      guestToken: null,
    };
  }

  async componentDidMount() {
    this.fetchMovieData();
    try {
      const genreData = await this.movieService.getGenresMovie();
      const guestToken = await this.movieService.getGuestSession();
      this.setState({ guestToken: guestToken.guest_session_id });
      this.setState({ genres: genreData.genres });
    } catch (err) {
      console.log(err);
    }
  }

  fetchMovieData = async (searchValue = "", page) => {
    try {
      const data = await this.movieService.getSearchMovie(searchValue, page);
      this.setState({
        movieData: data.results,
        loading: false,
        error: null,
        currentPage: data.page,
        totalPages: data.total_pages,
        searchValue,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  };

  handleVoteRated = async (key) => {
    if (key === "Rated") {
      try {
        const ratedMovieData = await this.movieService.getRatedMovies(
          this.state.guestToken
        );
        this.setState({
          ratedMovieData: ratedMovieData.results,
        });
        await console.log(ratedMovieData);
      } catch (err) {}
    }
  };

  handlePageChange = (page) => {
    this.setState(
      {
        currentPage: page,
        loading: true,
      },
      () => {
        this.fetchMovieData(this.state.searchValue, page);
      }
    );
  };

  handleSearch = (searchValue) => {
    this.setState(
      {
        searchValue,
        currentPage: 1,
        loading: true,
      },
      () => {
        this.fetchMovieData(searchValue, 1);
      }
    );
  };

  render() {
    const { movieData, loading, error, currentPage, totalPages, guestToken } =
      this.state;

    const item = [
      {
        key: "Search",
        label: "Search",
        children: (
          <>
            <HeaderSearchBar onSearch={this.fetchMovieData} />
            {error ? (
              <Alert
                message={`Error fetching movie data: ${error}`}
                type="error"
                showIcon
              />
            ) : (
              <>
                <MovieList
                  movieData={movieData}
                  loading={loading}
                  guestToken={guestToken}
                />
                <Pagination
                  className="pagination"
                  defaultCurrent={currentPage}
                  total={totalPages}
                  pageSize={20}
                  onChange={this.handlePageChange}
                />
              </>
            )}
          </>
        ),
      },
      {
        key: "Rated",
        label: "Rated",
        children: <MovieList movieData={this.state.ratedMovieData} />,
      },
    ];

    return (
      <Provider value={this.state.genres}>
        <main className="main-container">
          <Tabs
            defaultActiveKey="Search"
            centered
            items={item}
            onChange={(key) => this.handleVoteRated(key)}
          ></Tabs>
        </main>
      </Provider>
    );
  }
}

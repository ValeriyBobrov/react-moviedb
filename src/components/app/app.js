import React, { Component } from "react";
import MovieService from "../../services/movie-service";
import MovieList from "../movie-list";
import HeaderSearchBar from "../header-search-bar";
import "./app.css";
import { Alert, Pagination } from "antd";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
      movieData: [],
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 1,
      searchValue: "",
    };
  }

  componentDidMount() {
    this.fetchMovieData();
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
    const { movieData, loading, error, currentPage, totalPages } = this.state;

    return (
      <main className="main-container">
        <HeaderSearchBar onSearch={this.fetchMovieData} />
        {error ? (
          <Alert
            message={`Error fetching movie data: ${error}`}
            type="error"
            showIcon
          />
        ) : (
          <>
            <MovieList movieData={movieData} loading={loading} />
            <Pagination
              className="pagination"
              defaultCurrent={currentPage}
              total={totalPages}
              pageSize={20}
              onChange={this.handlePageChange}
            />
          </>
        )}
      </main>
    );
  }
}
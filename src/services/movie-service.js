export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'

  _apiKey = 'cd8a0e45ca4a997ab4318669b822a11f'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}/${url}&api_key=${this._apiKey}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${res.status}`)
    }

    return res.json()
  }

  getSearchMovie(query, page = 1) {
    return this.getResource(`search/movie?query=${query}&page=${page}&include_adult=false`)
  }

  async getGenresMovie() {
    const res = await fetch(`${this._apiBase}/genre/movie/list?language=en&api_key=${this._apiKey}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  async getGuestSession() {
    const res = await fetch(`${this._apiBase}/authentication/guest_session/new`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDhhMGU0NWNhNGE5OTdhYjQzMTg2NjliODIyYTExZiIsInN1YiI6IjY0ZDIxYTFkNGQ2NzkxMDEzOWVmYWViMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LzIYf5Y1OD-HOrOzFuVGbqx_61pi5xDZm95nrIfYs70',
      },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${res.status}`)
    }

    const body = await res.json()

    return body
  }

  async postRatedMovie(voteRating, movieId, guestSessionId) {
    const option = {
      method: 'Post',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value": ${voteRating}}`,
    }

    const res = await fetch(
      `${this._apiBase}/movie/${movieId}/rating?guest_session_id=${guestSessionId}&api_key=${this._apiKey}`,
      option
    )

    if (!res.ok) {
      throw new Error(`Fetch add vote dont work ${res.status}`)
    }
  }

  async getRatedMovies(guestSessionId, page) {
    const res = await fetch(
      `${this._apiBase}/guest_session/${guestSessionId}/rated/movies?page=${page}&api_key=${this._apiKey}`
    )

    if (!res.ok) {
      throw new Error(`Fetch error ${res.status}`)
    }

    const body = res.json()

    return body
  }
}

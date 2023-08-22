export default class MovieService {
  _apiBase = "https://api.themoviedb.org/3";
  _apiKey = "cd8a0e45ca4a997ab4318669b822a11f";
  async getResource(url) {
    const res = await fetch(`${this._apiBase}/${url}&api_key=${this._apiKey}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${res.status}`);
    }

    return await res.json();
  }

  getSearchMovie(query, page = 1) {
    return this.getResource(
      `search/movie?query=${query}&page=${page}&include_adult=false`
    );
  }
}

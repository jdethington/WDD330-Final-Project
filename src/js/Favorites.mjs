import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage,
  STORAGE_KEY,
} from "./utils.mjs";
import { movieCardTemplate } from "./MovieList.mjs";

export default class Favorites {
  constructor() {
    this.movies = [];
    this.listSelection = document.querySelector("#results");
  }

  async init() {
    // get movies from local storage
    this.movies = await getLocalStorage(STORAGE_KEY);
    // the Movie details are needed before rendering the HTML
    // console.log("List Selection: ", this.listSelection);
    // console.log("Favorites: ", this.movies);
    this.renderMovieList(this.movies);
  }
  renderMovieList(movieList) {
    renderListWithTemplate(
      movieCardTemplate,
      this.listSelection,
      movieList,
      "afterbegin",
      false,
    );
  }
}

// =====================================================================

// Returns true if movie is stored in local storage
export function isFavorite(id) {
  const movieList = getLocalStorage(STORAGE_KEY) || [];
  return movieList.some((movie) => movie.id === id);
}

// Adds movie to local storage
export function addFavorite(movie) {
  const movieList = getLocalStorage(STORAGE_KEY) || [];

  if (!movieList.some((f) => f.id === movie.id)) {
    movieList.push(movie);
    setLocalStorage(STORAGE_KEY, movieList);
  }
}

// Removes movie from local storage
export function removeFavorite(id) {
  const movieList = getLocalStorage(STORAGE_KEY).filter(
    (movie) => movie.id !== id,
  );
  setLocalStorage(STORAGE_KEY, movieList);
}


export function toggleFavorite(movie) {
  //   const favoriteMovie = {
  //     id: movie.id,
  //     title: movie.title,
  //     overview: movie.overview,
  //     releaseYear: movie.releaseYear,
  //     genres: movie.genres,
  //     directors: movie.directors,
  //     cast: movie.cast,
  //     rating: movie.rating,
  //     runtime: movie.runtime,
  //     poster: movie.imageSet.verticalPoster.w240,
  //     backdrop: movie.imageSet.horizontalBackdrop.w1080,
  //     streamingOptions: movie.streamingOptions.us,
  //   };
  if (isFavorite(movie.id)) {
    removeFavorite(movie.id);
  } else {
    addFavorite(movie);
    // addFavorite(favoriteMovie);
  }
}

// =====================================================================

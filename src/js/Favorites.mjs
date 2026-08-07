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
    this.listSelection = document.querySelector("#favorites");
    this.noFavorites = document.querySelector("#favorites");
    // this.noFavorites = document.querySelector(".movie-lists");
  }

  async init() {
    // get movies from local storage
    this.movies = await getLocalStorage(STORAGE_KEY);
    // console.log("List Selection: ", this.listSelection);
    // console.log("Favorites: ", this.movies);

    if (this.movies.length == 0) {
      this.noFavorites.innerHTML = `<h2 class="no-favorites">Your favorite movies will show up here after you select them.</h2>`;
    } else {
      this.renderMovieList(this.movies);
    }
  }

  renderMovieList(movieList) {
    renderListWithTemplate(
      movieCardTemplate,
      this.listSelection,
      movieList,
      "afterbegin",
      true,
    );

    this.listSelection
      .querySelectorAll(".favorite-btn")
      .forEach((button, index) => {
        const movie = movieList[index];
        if (!movie) return;

        button.addEventListener("click", () => {
          const isNowFavorite = toggleFavorite(movie);
          if (!isNowFavorite) {
            const card = button.closest(".movie-card");
            card?.remove();
            return;
          }

          button.textContent = "☑️ Favorite";
        });
      });
  }
}

// ============================ Favorites functions ====================

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
  if (isFavorite(movie.id)) {
    removeFavorite(movie.id);
    return false;
  }

  addFavorite(movie);
  return true;
}

// =====================================================================

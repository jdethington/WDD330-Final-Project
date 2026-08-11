import { getLocalStorage, setLocalStorage, STORAGE_KEY } from "./utils.mjs";
import { movieCardTemplate, renderMovieList } from "./MovieList.mjs";

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
      renderMovieList(this.movies, this.listSelection);
    }
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
export function updateFavoritesList(movie, isNowFavorite) {
  const favoritesContainer = document.querySelector("#favorites");
  if (!favoritesContainer) return; // only runs on the home page

  if (isNowFavorite) {
    // Remove the "no favorites" message if it exists
    const emptyMsg = favoritesContainer.querySelector(".no-favorites");
    if (emptyMsg) emptyMsg.remove();

    // Don't add a duplicate
    if (favoritesContainer.querySelector(`[data-id="${movie.id}"]`)) return;

    // Create the card using the same template
    const newCard = document.createElement("div");
    newCard.className = "movie-card";
    newCard.dataset.id = movie.id;
    newCard.innerHTML = movieCardTemplate(movie);

    // Attach the same favorite button listener to the new card
    const btn = newCard.querySelector(".favorite-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const stillFavorite = toggleFavorite(movie);
        // Update the button on *this* card
        btn.innerHTML = stillFavorite
          ? `<img src="/images/heart.svg" alt="Movie in favorites">`
          : `<img src="/images/heart-hollow.svg" alt="Add to favorites">`;

        // Remove the badge and the card itself when unfavorited
        if (!stillFavorite) {
          // Remove this card from favorites list
          newCard.remove();
          // Update every other card of the same movie on the page
          document.querySelectorAll(`.movie-card[data-id="${movie.id}"]`).forEach((otherCard) => {
            // remove the favorite badge
            otherCard.querySelector(".favorite-badge")?.remove();

            // Change button back to hollow heart
            const otherBtn = otherCard.querySelector(".favorite-btn");
            if (otherBtn) {
              otherBtn.innerHTML = `<img src="/images/heart-hollow.svg" alt="Add to favorites">`;
            }
          });

          // Show empty message if Favorite list is now empty
          if (!favoritesContainer.querySelector(".movie-card")) {
            favoritesContainer.innerHTML = `
              <h2 class="no-favorites">
                Your favorite movies will show up here after you select them.
              </h2>`;
          }
        }
      });
    }

    // Add the new card at the beginning of the favorites list
    favoritesContainer.prepend(newCard);
    // newCard.classList.add("just-added");
    // setTimeout(() => newCard.classList.remove("just-added"), 400);
    newCard.classList.add("slide-in");
    newCard.addEventListener(
      "animationend",
      () => newCard.classList.remove("slide-in"),
      { once: true },
    );
  } else {
    // User unfavorited → remove the card from the favorites list
    const cardToRemove = favoritesContainer.querySelector(
      `[data-id="${movie.id}"]`,
    );
    if (cardToRemove) cardToRemove.remove();

    // Show empty message if nothing left
    if (!favoritesContainer.querySelector(".movie-card")) {
      favoritesContainer.innerHTML = `
        <h2 class="no-favorites">
          Your favorite movies will show up here after you select them.
        </h2>`;
    }
  }
}

// =====================================================================

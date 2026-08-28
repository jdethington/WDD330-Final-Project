import { getLocalStorage, setLocalStorage, STORAGE_KEY } from "./utils.mjs";
import { movieCardTemplate, renderMovieList } from "./MovieList.mjs";

export default class Favorites {
  constructor() {
    this.allFavorites = [];
    this.listSelection = document.querySelector("#favorites");
    this.currentType = "movie"; // default to movie, but could be changed to series in the future
  }

  async init() {
    // get movies from local storage
    this.allFavorites = await getLocalStorage(STORAGE_KEY);

    if (this.allFavorites.length == 0) {
      this.listSelection.innerHTML = `<h2 class="no-favorites">Your favorite movies and series will show up here after you select them.</h2>`;
    } else {
      this.setupTabs();
      this.displayFilteredFavorites();
      // renderMovieList(this.allFavorites, this.listSelection);
    }
  }

  setupTabs() {
    const buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) return; // do nothing if the button is already active
        buttons.forEach((b) => (b.disabled = true)); // disable all buttons while processing
        // Remove the 'active' class from all buttons
        buttons.forEach((b) => b.classList.remove("active"));
        // Add the 'active' class to the clicked button
        btn.classList.add("active");
        // Update the currentType based on the button's data-type attribute
        this.currentType = btn.dataset.type;
        this.displayFilteredFavorites();
        setTimeout(() => {
          buttons.forEach((b) => (b.disabled = false)); // re-enable buttons after processing
        }, 300);
      });
    });
  }

  displayFilteredFavorites() {
    const container = this.listSelection;
    container.innerHTML = ""; // Clear the container before rendering new content
    container.innerHTML = `
      <div class="spinner" id="spinner"></div>
    `; // Add spinner while loading

    setTimeout(() => {
      const filteredFavorites = this.allFavorites.filter(
        (item) => item.showType === this.currentType,
      );

      if (filteredFavorites.length === 0) {
        container.innerHTML = `<h2 class="no-favorites">No ${this.currentType}s in your favorites.</h2>`;
      } else {
        renderMovieList(filteredFavorites, container);
      }
    }, 500); // Simulate a delay for loading effect
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
          document
            .querySelectorAll(`.movie-card[data-id="${movie.id}"]`)
            .forEach((otherCard) => {
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
                Your favorite movies and series will show up here after you select them.
              </h2>`;
          }
        }
      });
    }

    // Add the new card at the beginning of the favorites list
    favoritesContainer.prepend(newCard);
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

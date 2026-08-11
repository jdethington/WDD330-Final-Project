import {
  formatList,
  streamingServices,
  getLocalStorage,
  STORAGE_KEY,
} from "./utils.mjs";
import { isFavorite, toggleFavorite } from "./Favorites.mjs";

export default class MovieDetails {
  constructor(movieId, dataSource) {
    this.movieId = movieId;
    this.movie = {};
    this.dataSource = dataSource;
  }
  async init() {
    // Determine if movie info is stored as Favorite
    if (isFavorite(this.movieId)) {
      const favorites = await getLocalStorage(STORAGE_KEY);
      const movieLS = favorites.find((movie) => movie.id == this.movieId);
      // console.log(movieLS);
      this.movie = movieLS || {};
    } else {
      // use the datasource to get the details for the current movie. findMovieById will return a promise! use await to process it
      this.movie = await this.dataSource.getMovieById(this.movieId);

      // Set the title for the browser tab ===========================================
      const title = this.movie?.title || "Movie";
      document.title = `Movies | ${title}`;
      // Set the Page title ===========================================
      const h1 = document.querySelector("h1");
      h1.innerText = title;
    }
    // console.log(this.movie);
    this.renderMovieDetails();
  }

  renderMovieDetails() {
    const mainElement = document.querySelector("#show");
    mainElement.innerHTML = "";
    if (mainElement) {
      mainElement.innerHTML = movieDetailsTemplate(this.movie);
      this.attachFavoriteListener();
    }
  }

  attachFavoriteListener() {
    const button = document.querySelector(".isFavorite");
    if (!button) return;

    button.addEventListener("click", (e) => {
      e.stopPropagation();

      const isNowFavorite = toggleFavorite(this.movie);
      const heroImg = document.querySelector(".movie-details");

      button.innerHTML = isNowFavorite
        ? `<img src="/images/heart.svg" alt="Movie in favorites">`
        : `<img src="/images/heart-hollow.svg" alt="Add to favorites">`;

      // Add or remove the corner badge
      if (isNowFavorite) {
        // Only add if it doesn't already exist
        if (!heroImg.querySelector(".favorite-badge")) {
          const badge = document.createElement("div");
          badge.className = "favorite-badge";
          badge.innerHTML = `<img src="/images/heart.svg" alt="Movie in favorites">`;
          heroImg.querySelector(".movie-hero").prepend(badge);
        }
      } else {
        heroImg.querySelector(".favorite-badge")?.remove();
      }
    });
  }
}

// Return a template for the movie to be displayed
function movieDetailsTemplate(movie) {
  // console.log("Movie: ", movie);

  const title = movie.title || "No Title Found";
  const cast = formatList(movie.cast) || "No Cast Available ";
  const genre = formatList(movie.genres) || "No Genres Found";
  const directors = formatList(movie.directors) || "No Directors Found";
  const streaming = streamingServices(movie) || [];

  const isFav = isFavorite(movie.id);

  const favorite = isFav
    ? `<img src="/images/heart.svg" alt="Filled heart">`
    : `<img src="/images/heart-hollow.svg" alt="Hollow heart">`;

  const favoriteBadge = isFav
    ? ` <div class="favorite-badge">
          <img src="/images/heart.svg" alt="Movie in favorites">
        </div>`
    : "";

  const backdrop =
    movie.imageSet?.horizontalBackdrop?.w1080 ||
    movie.imageSet?.horizontalBackdrop?.w720 ||
    "";
  const poster =
    movie.imageSet?.verticalPoster?.w480 ||
    movie.imageSet?.verticalPoster?.w360 ||
    "";

  return `
    <section class="movie-details">
      <div class="movie-hero">
        ${favoriteBadge}
        <img class="hero-background" src="${backdrop}" alt="${title} backdrop" loading="lazy">
        <div class="hero-overlay"></div>
        </div>
        
        <div class="movie-content">
          <div class="movie-poster-wrap">
            <img class="movie-poster" src="${poster}" alt="${title} poster" loading="lazy">
          </div>
        
        <div class="movie-info">
          <h1 class="movie-title">${title}</h1>
          <p class="movie-overview">${movie.overview || "No overview available."}</p>

          <dl class="movie-meta">
            <div class="meta-row">
            <dt>Released</dt>
            <dd>${movie.releaseYear || "Unknown"}</dd>
            </div>
            <div class="meta-row">
            <dt>Genres</dt>
            <dd>${genre}</dd>
            </div>
            <div class="meta-row">
            <dt>Director</dt>
            <dd>${directors}</dd>
            </div>
            <div class="meta-row">
            <dt>Cast</dt>
            <dd>${cast}</dd>
            </div>
            <div class="meta-row">
            <dt>Streaming</dt>
            <dd class="meta-streaming">${streaming}</dd>
            </div>
          </dl>
          <button class="btn btn-favorites isFavorite" aria-label="Favorite heart">
            ${favorite}
          </button>
        </div>
      </div>
    </section>
  `;
}

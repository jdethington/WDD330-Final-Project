// ********************************************************
import { isFavorite, toggleFavorite } from "./Favorites.mjs";
import { renderListWithTemplate, toTitleCase } from "./utils.mjs";

export default class MovieList {
  constructor(searchQuery, dataSource, listSection) {
    this.searchQuery = searchQuery; // Search term passed in the URL query string.
    this.movies = [];
    this.dataSource = dataSource;
    this.listSection = listSection; // Which section to render the list into.
  }

  async init() {
    // use the datasource to get the details for the current movie. findMovieById will return a promise! use await to process it
    this.movies = await this.dataSource.searchShows(this.searchQuery);
    // this.movies = await this.dataSource.getTopShows();
    // this.movies = await this.dataSource.searchShows(this.searchQuery);
    // the Movie details are needed before rendering the HTML
    // console.log("MovieList.mjs SearchQuery", this.searchQuery);
    // console.log("MovieList.mjs", this.movies);
    renderMovieList(this.movies, this.listSection);

    const title = this.searchQuery;
    // Set the title for the browser tab ===========================================
    if (title !== null) {
      document.title = `Movies | ${toTitleCase(title)}`;
    }
  }
  async getTopShows(series, type) {
    this.movies = await this.dataSource.getTopShows(series, type);
    // console.log("MovieList.mjs SearchQuery", this.searchQuery);
    // console.log("MovieList.mjs", this.movies);

    renderMovieList(this.movies, this.listSection);
  }
  async getNewestShows(series, type) {
    this.movies = await this.dataSource.getNewestShows(series, type);
    // console.log("MovieList.mjs SearchQuery", this.searchQuery);
    console.log("MovieList.mjs", this.movies);

    renderMovieList(this.movies, this.listSection);
  }
}

export function renderMovieList(movieList, listSection) {
  renderListWithTemplate(
    movieCardTemplate,
    listSection,
    movieList,
    "afterbegin",
    true,
  );

  listSection.querySelectorAll(".favorite-btn").forEach((button, index) => {
    const movie = movieList[index];
    if (!movie) return;

    button.addEventListener("click", (e) => {
      e.stopPropagation();

      const isNowFavorite = toggleFavorite(movie);
      const card = button.closest(".movie-card");

      // Update button icon
      button.innerHTML = isNowFavorite
        ? `<img src="/images/heart.svg" alt="Movie in favorites">`
        : `<img src="/images/heart-hollow.svg" alt="Add to favorites">`;

      // Add or remove the corner badge
      if (isNowFavorite) {
        // Only add if it doesn't already exist
        if (!card.querySelector(".favorite-badge")) {
          const badge = document.createElement("div");
          badge.className = "favorite-badge";
          badge.innerHTML = `<img src="/images/heart.svg" alt="Movie in favorites">`;
          card.querySelector(".card-front").prepend(badge);
        }
      } else {
        card.querySelector(".favorite-badge")?.remove();
      }
    });
  });
}

// ======================================================================================
// Template for each card
export function movieCardTemplate(movie) {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  const poster =
    movie.imageSet.verticalPoster.w240 ||
    movie.imageSet.verticalPoster.w360 ||
    "";
  const runtime = movie.runtime ?? "Unknown";
  const rating = movie.rating ?? "N/A";
  const releaseYear = movie.releaseYear ?? "Unknown";
  const title = movie.title || "No Title Found";

  const isFav = isFavorite(movie.id);

  const buttonText = isFav
    ? `<img src="/images/heart.svg">`
    : `<img src="/images/heart-hollow.svg">`;

  const favoriteBadge = isFav
    ? ` <div class="favorite-badge">
          <img src="/images/heart.svg" alt="Movie in favorites">
        </div>`
    : "";

  if (isMobile) {
    return `
    <div class="card-inner">
      <div class="card-front">
      ${favoriteBadge}
      <img src="${poster}" alt="${title} poster" loading="lazy">
      <p class="title-front">${title}</p>
    </div>
    <div class="card-back">
      <p>${releaseYear}</p>
      <p>${runtime} min</p>
      <p>⭐${rating}/100</p>
      <div class="btn btn-details"><a href="/moviePage/index.html?id=${movie.id}">Details</a></div>
        <button class=" btn favorite-btn">
          ${buttonText}
        </button>
      </div>
    </div>
    `;
  } else {
    return `
    <div class="card-inner">
      <div class="card-front">
        ${favoriteBadge}
        <img src="${poster}" alt="${title} poster" loading="lazy">
      </div>
      <div class="card-back">
        <h3>${title}</h3>
        <p>${releaseYear}</p>
        <p>${runtime} min</p>
        <p>Rating: ⭐${rating}/100</p>
        <div class="btn btn-details"><a href="/moviePage/index.html?id=${movie.id}">
          More Details</a>
        </div>
        <button class=" btn favorite-btn">
          ${buttonText}
        </button>
      </div>
    </div>
  `;
  }
}

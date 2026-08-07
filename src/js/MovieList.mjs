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
    this.movies = await this.dataSource.searchMovieByTitle(this.searchQuery);
    // this.movies = await this.dataSource.searchShows(this.searchQuery);
    // the Movie details are needed before rendering the HTML
    console.log("MovieList.mjs SearchQuery", this.searchQuery);
    console.log("MovieList.mjs", this.movies);
    this.renderMovieList(this.movies);

    const title = this.searchQuery;
    // Set the title for the browser tab ===========================================
    if (title !== null) {
      document.title = `Movies | ${toTitleCase(title)}`;
    }
  }

  renderMovieList(movieList) {
    renderListWithTemplate(
      movieCardTemplate,
      this.listSection,
      movieList,
      "afterbegin",
      true,
    );

    this.listSection
      .querySelectorAll(".favorite-btn")
      .forEach((button, index) => {
        const movie = movieList[index];
        if (!movie) return;

        button.addEventListener("click", (e) => {
          const isNowFavorite = toggleFavorite(movie);
          button.textContent = isNowFavorite ? "☑️ Favorite" : "Add Favorite";
          e.stopPropagation();
        });
      });
  }
}

// ======================================================================================
// Template for each card
export function movieCardTemplate(movie) {
  const poster =
    movie.imageSet.verticalPoster.w240 ||
    movie.imageSet.verticalPoster.w360 ||
    "";
  const runtime = movie.runtime ?? "Unknown";
  const rating = movie.rating ?? "N/A";
  const releaseYear = movie.releaseYear ?? "Unknown";
  const title = movie.title || "No Title Found";
  const buttonText = isFavorite(movie.id) ? "☑️ Favorite" : "Add Favorite";

  return `
    <div class="card-inner">
      <div class="card-front">
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

import { formatList, streamingServices } from "./utils.mjs";
import { isFavorite } from "./favorites.js";

export default class MovieDetails {
  constructor(movieId, dataSource) {
    this.movieId = movieId;
    this.movie = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use the datasource to get the details for the current movie. findMovieById will return a promise! use await to process it
    this.movie = await this.dataSource.getMovieById(this.movieId);
    // the Movie details are needed before rendering the HTML
    console.log(this.movie);
    this.renderMovieDetails();

    // Set the page title with the title of the movie
    const title = this.movie?.title || "Movie";
    document.title = `Movies | ${title}`;
  }

  renderMovieDetails() {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.innerHTML = movieDetailsTemplate(this.movie);
    }
  }
}

// Return a template for the movie to be displayed
function movieDetailsTemplate(movie) {
  console.log("Movie: ", movie);
  
  const title = movie.title || "No Title Found";
  const cast = formatList(movie.cast);
  const genre = formatList(movie.genres);
  const directors = formatList(movie.directors);
  const streaming = streamingServices(movie);
  // const favorite = "Add to Favorite"
  const favorite = isFavorite(movie.id) ? "Remove Favorite" : "Add Favorite";

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
          <button class="btn btn-favorites">
            ${favorite}
          </button>
        </div>
      </div>
    </section>
  `;
}

// ********************************************************
import { toTitleCase } from "./utils.mjs";
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
    // the Movie details are needed before rendering the HTML
    console.log(this.movies);
    this.renderMovieList(this.movies);
    // this.renderList(this.movies);

    const title = this.searchQuery || "List";
    // Set the a title for the browser tab ===========================================
    if (title !== null) {
      document.title = `Movies | ${toTitleCase(title)}`;
    }
    const search = document.querySelector("#search-name");
    search.innerHTML = `Search Results for: ${toTitleCase(title)}`;
  }
  renderMovieList(movieList) {
    renderListWithTemplate(
      movieCardTemplate,
      this.listSection,
      movieList,
      "afterbegin",
      false,
    );
  }
}
// =======================
function renderListWithTemplate(
  templateCard,
  parentElement,
  movies,
  position,
  clear,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const container = parentElement;
  container.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");

    card.className = "movie-card";
    card.dataset.id = movie.id;

    card.innerHTML = movieCardTemplate(movie);
    container.appendChild(card);
  });
}
// Template for each card
function movieCardTemplate(movie) {
  const poster =
    movie.imageSet.verticalPoster.w240 ||
    movie.imageSet.verticalPoster.w360 ||
    "";
  const runtime = movie.runtime ?? "Unknown";
  const rating = movie.rating ?? "N/A";
  const releaseYear = movie.releaseYear ?? "Unknown";
  const title = movie.title || "No Title Found";

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
            </div>
        </div>
    `;
}

// function movieListTemplate(movies) {
//   console.log("Movies: ", movies);

//   movies.forEach((movie) => {
//     const card = document.createElement("div");

//     card.className = "movie-card";

//     card.dataset.id = movie.id;

//     card.innerHTML = `
//         <div class="card-inner">
//             <div class="card-front">
//                 <img src="${movie.imageSet.verticalPoster.w240}" alt="${movie.title} poster" loading="lazy">
//             </div>
//             <div class="card-back">
//                 <h3>${movie.title}</h3>
//                 <p>${movie.releaseYear}</p>
//                 <p>${movie.runtime ?? "Unknown"} min</p>
//                 <p>Rating: ⭐${movie.rating}/100</p>
//                 <div class="btn btn-details"><a href="/moviePage/index.html?id=${movie.id}">
//                     More Details</a>
//                 </div>
//             </div>
//         </div>
//     `;
//   });
// }

// =================================================================
// export function displayResults(data) {
//   const container = document.querySelector("#results");

//   container.innerHTML = "";

//   data.forEach((show) => {
//     const card = document.createElement("div");

//     card.className = "movie-card";
//     card.dataset.id = show.id;

//     card.innerHTML = `
//         <div class="card-inner">
//             <div class="card-front">
//                 <img src="${show.imageSet.verticalPoster.w240}" alt="${show.title} poster" loading="lazy">
//             </div>
//             <div class="card-back">
//                 <h3>${show.title}</h3>
//                 <p>${show.releaseYear}</p>
//                 <p>${show.runtime ?? "Unknown"} min</p>
//                 <p>Rating: ⭐${show.rating}/100</p>
//                 <div class="btn btn-details"><a href="/moviePage/index.html?id=${show.id}">
//                     More Details</a>
//                 </div>
//             </div>
//         </div>
//     `;
//     container.appendChild(card);
//   });
// }

// export function displayMovie(movie) {
//   const formatList = (items) =>
//     items
//       ?.slice(0, 5)
//       .map((item) =>
//         typeof item === "string" ? item : item?.name ?? item?.title ?? "",
//       )
//       .filter(Boolean)
//       .join(", ") || "Unavailable";

//   const cast = formatList(movie.cast);
//   const genre = formatList(movie.genres);
//   const directors = formatList(movie.directors);

//   //   console.log("Cast", cast);
//   //   console.log("genre", genre);
//   //   console.log("directors", directors);

//   document.querySelector("#details").innerHTML = `
//         <img class="hero-background" src="${movie.imageSet.horizontalBackdrop.w720}" alt="${movie.title} backdrop" loading="lazy">

//         <h2>${movie.title}</h2>

//         <img src="${movie.imageSet.verticalPoster.w480}">

//         <p>${movie.overview}</p>

//         <p><strong>Released:</strong> ${movie.releaseYear}</p>

//         <p><strong>Genres:</strong> ${genre}</p>
//         <p><strong>Director:</strong> ${directors}</p>
//         <p><strong>Cast:</strong> ${cast}</p>
//         `;
// }
// // <p><strong>Streaming:</strong> ${movie.streamingOptions.us.service.name} min</p>

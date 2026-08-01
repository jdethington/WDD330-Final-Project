import { loadHeaderFooter, getParam } from "./utils.mjs";
import MovieData from "./MovieData.mjs";
import MovieDetails from "./MovieDetails.mjs";

loadHeaderFooter();

// =====================================================================
const dataSource = new MovieData();
const movieId = getParam("id");
const movie = new MovieDetails(movieId, dataSource);
movie.init();

// =====================================================================
// Need to move this into a shared mjs file
document.querySelector("#searchBtn").addEventListener("click", search);

async function search() {
  try {
    const searchTerm = document.querySelector("#searchInput").value.trim();

    if (!searchTerm) return;
    // Redirect to List page with search term
    window.location.href = `/movieList/index.html?id=${searchTerm}`;
  } catch (error) {
    // console.error(error);
    alert(error.message);
  }
}
// =====================================================================

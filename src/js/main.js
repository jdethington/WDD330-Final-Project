import {
  loadHeaderFooter,
  getLocalStorage,
  // setLocalStorage,
} from "./utils.mjs";

import MovieData from "./MovieData.mjs";
import MovieList from "./MovieList.mjs";


loadHeaderFooter();

// =====================================================================
// Favorite Movies and Shows
// Get favorites from local storage
const favorites = getLocalStorage("ML-favorites") || [];
// If there are no favorites, do not display the favorites section
if (favorites.length === 0) {
  const listId = null;
  const dataSource = new MovieData();
  const listSection = document.querySelector("#favorites");
  const movie = new MovieList(listId, dataSource, listSection);
  // movie.init();
}

// =====================================================================

document.querySelector("#searchBtn").addEventListener("click", search);

async function search() {
  try {
    const searchTerm = document.querySelector("#searchInput").value.trim();

    if (!searchTerm) return;
    // Redirect to List page with search term
    window.location.href = `/movieList/index.html?id=${searchTerm}`
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

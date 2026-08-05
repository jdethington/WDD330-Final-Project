import {
  loadHeaderFooter,
  getLocalStorage,
  STORAGE_KEY,
  // setLocalStorage,
} from "./utils.mjs";

import MovieData from "./MovieData.mjs";
import MovieList from "./MovieList.mjs";
import Favorites from "./Favorites.mjs";

loadHeaderFooter();

// =====================================================================
// Favorite Movies and Shows
// Get favorites from local storage
const favorites = getLocalStorage(STORAGE_KEY) || [];
console.log(favorites);
// If there are no favorites, do not display the favorites section
if (favorites.length > 0) {
  const favoriteMovies = new Favorites();
  favoriteMovies.init();
}

// =====================================================================
// Need to move this into a shared mjs file
// document.querySelector("#searchBtn").addEventListener("click", search);

// async function search() {
//   try {
//     const searchTerm = document.querySelector("#searchInput").value.trim();

//     if (!searchTerm) return;
//     // Redirect to List page with search term
//     window.location.href = `/movieList/index.html?id=${searchTerm}`;
//   } catch (error) {
//     // console.error(error);
//     alert(error.message);
//   }
// }
// =====================================================================

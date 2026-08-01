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

// const button = document.querySelector("#searchBtn");

// button.addEventListener("click", async () => {
//   const id = document.querySelector("#movieId").value;

//   try {
//     const movie = await getMovie(id);

//     // console.log(movie);

//       displayMovie(movie);
//     // console.log(movie);

//   } catch (error) {
//     alert(error.message);
//   }
// });

// =====================================================================

document.querySelector("#searchBtn").addEventListener("click", search);

async function search() {
  try {
    const searchTerm = document.querySelector("#searchInput").value.trim();

    if (!searchTerm) return;
    // Redirect to List page with search term
    window.location.href = "/"

    // Returns results in page
    // const data = await searchShows(searchTerm);
    // console.log("Data", data);
    // displayResults(data);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

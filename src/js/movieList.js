import { loadHeaderFooter, getParam } from "./utils.mjs";
import MovieData from "./MovieData.mjs";
import MovieList from "./MovieList.mjs";

loadHeaderFooter();

// =====================================================================
const dataSource = new MovieData();
const searchQuery = getParam("id") || null; // Search term passed in the URL query string. If no search term is provided, it will be null. This is used to determine which list of movies to display.
// const listSection = "#search-results"; // Which section to render the list into. This is a CSS selector for the section element in the HTML where the movie list will be displayed.
const listSection = document.querySelector("#search-results"); // Which section to render the list into. This is a CSS selector for the section element in the HTML where the movie list will be displayed.
const movieList = new MovieList(searchQuery, dataSource, listSection);
movieList.init();

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

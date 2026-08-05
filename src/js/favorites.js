import { loadHeaderFooter } from "./utils.mjs";
import FavoritesStored from "./Favorites.mjs";

loadHeaderFooter();

// =====================================================================
// const dataSource = new MovieData();
// const searchQuery = getParam("id") || null; // Search term passed in the URL query string. If no search term is provided, it will be null. This is used to determine which list of movies to display.
// // const listSection = "#search-results"; // Which section to render the list into. This is a CSS selector for the section element in the HTML where the movie list will be displayed.
// const listSection = document.querySelector("#search-results"); // Which section to render the list into. This is a CSS selector for the section element in the HTML where the movie list will be displayed.
// const movieList = new MovieList(searchQuery, dataSource, listSection);
// movieList.init();

// =====================================================================
const favoriteMovies = new FavoritesStored();
favoriteMovies.init();
// =====================================================================

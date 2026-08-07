import { loadHeaderFooter, getParam } from "./utils.mjs";

import MovieData from "./MovieData.mjs";
import MovieList from "./MovieList.mjs";
import Favorites from "./Favorites.mjs";

loadHeaderFooter();

// =====================================================================
// Favorite Movies and Shows
// Get favorites from local storage
// const favorites = getLocalStorage(STORAGE_KEY) || [];
// console.log(favorites);
// If there are no favorites, do not display the favorites section
const favoriteMovies = new Favorites();
favoriteMovies.init();

const dataSource = new MovieData();
const searchQuery = getParam("id") || null; // Search term passed in the URL query string. If no search term is provided, it will be null. This is used to determine which list of movies to display.
// const listSection = "#search-results"; // Which section to render the list into. This is a CSS selector for the section element in the HTML where the movie list will be displayed.
const listSection = document.querySelector("#top-movies"); // Which section to render the list into. This is a CSS selector for the section element in the HTML where the movie list will be displayed.
const movieList = new MovieList(searchQuery, dataSource, listSection);
movieList.getTopShows("prime", "movie");
const seriesSection = document.querySelector("#new-movies"); // Which section to render the list into. This is a CSS selector for the section element in the HTML where the movie list will be displayed.
const seriesList = new MovieList(searchQuery, dataSource, seriesSection);
seriesList.getTopShows("prime", "series");

// const newMoviesSection = document.querySelector("#new-movies"); // Which section to render the list into. This is a CSS selector for the section element in the HTML where the movie list will be displayed.
// const newMovieList = new MovieList(searchQuery, dataSource, newMoviesSection);
// newMovieList.getNewestShows("prime", "series");

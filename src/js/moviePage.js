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

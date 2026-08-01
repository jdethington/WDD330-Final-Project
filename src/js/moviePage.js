import { getParam, loadHeaderFooter } from "./utils.mjs";
import MovieData from "./MovieData.mjs";
import {} from "./MovieList.mjs";
import MovieDetails from "./MovieDetails.mjs";

loadHeaderFooter();

// =====================================================================
const dataSource = new MovieData();
const movieId = await getParam("id");
const movie = new MovieDetails(movieId, dataSource);
movie.init();

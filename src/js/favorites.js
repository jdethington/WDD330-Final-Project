import { loadHeaderFooter } from "./utils.mjs";
import Favorites from "./Favorites.mjs";

loadHeaderFooter();


// =====================================================================
const favoriteMovies = new Favorites();
favoriteMovies.init();
// =====================================================================

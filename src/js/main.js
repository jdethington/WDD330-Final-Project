import { loadHeaderFooter } from "./utils.mjs";
// import MovieData from "./MovieData.mjs";

loadHeaderFooter();

// =====================================================================
import { getMovie } from "./MovieData.mjs";
import { displayMovie } from "./MovieList.mjs";

const button = document.querySelector("#searchBtn");

button.addEventListener("click", async () => {
  const id = document.querySelector("#movieId").value;

  try {
    const movie = await getMovie(id);

    // console.log(movie);

      displayMovie(movie);
    // console.log(movie);
      
  } catch (error) {
    alert(error.message);
  }
});

// =====================================================================


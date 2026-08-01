import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// =====================================================================
import { searchShows, getShow } from "./MovieData.mjs";
// import { getMovie, searchShows, getShow } from "./MovieData.mjs";
import { displayMovie, displayResults } from "./MovieList.mjs";

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
    const title = document.querySelector("#searchInput").value.trim();

    if (!title) return;

    const data = await searchShows(title);
    console.log("Data", data);

    displayResults(data);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}


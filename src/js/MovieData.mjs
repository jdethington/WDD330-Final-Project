// const baseURL = import.meta.env.VITE_SERVER_URL;
const apiURL = import.meta.env.VITE_API_URL;
const apiKEY = import.meta.env.VITE_API_KEY;
// ===================================================== start
// =============== API options =========================
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": apiKEY,
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};
// =====================================================
// get information on 1 movie
// export async function getMovie(id) {
//   const newId = id || "110";
//   const url = `${apiURL}/shows/${newId}?output_language=en`;

//   const response = await fetch(url, options);
//   // console.log(response);

//   if (!response.ok) {
//     throw new Error("Movie not found");
//   }

//   return await response.json();
// }
// =====================================================
// get information on movie search title
// export async function getMovies(search) {

//   const url = `${apiURL}/shows/search/title?country=us&title=${search}&series_granularity=show&show_type=movie&output_language=en`;

//   const response = await fetch(url, options);
//   // console.log(response);

//   if (!response.ok) {
//     throw new Error("Movie not found");
//   }

//   return await response.json();
// }

// function joinSearchTerms(search) {

// }
// =====================================================
// const headers = {
//   "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
//   "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
//   "Content-Type": "application/json",
// };

export async function searchShows(query) {
  const url = `${apiURL}/shows/search/title?title=${encodeURIComponent(query)}&country=us&show_type=movie&output_language=en`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Search failed.");
  }

  return await response.json();
}

export async function getShow(id) {
  const url = `${apiURL}/shows/${id}?output_language=en`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Unable to load movie.");
  }

  return await response.json();
}

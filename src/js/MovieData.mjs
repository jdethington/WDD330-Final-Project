// const baseURL = import.meta.env.VITE_SERVER_URL;
const apiBaseURL = (
  import.meta.env.VITE_API_URL || "https://api.movieofthenight.com/v4/"
).replace(/\/?$/, "/");

const DEFAULT_API_KEY = "motn-key-v4-Qwv0rNZBLxxT3Z87bi1DonkHJ4qX5I8X";

function getApiKey() {
  const apiKey = import.meta.env.VITE_API_KEY || DEFAULT_API_KEY;
  console.log("Movie API key loaded:", apiKey ? "present" : "missing");
  return apiKey;
}

function buildApiUrl(path) {
  return new URL(path.replace(/^\/+/, ""), apiBaseURL).toString();
}

// =============== Rapid API options =========================
// const options = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": apiKEY,
//     "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
//     "Content-Type": "application/json",
//   },
// };
// =============== Rapid API options =========================

export default class MovieData {
  constructor() {}
  // const data = await client.showsApi.searchShowsByTitle({  --movieofthenight.com--
  async searchShows(query) {
    const apiKEY = await getApiKey();
    if (!apiKEY) {
      throw new Error("Movie API key is not configured.");
    }

    const url = buildApiUrl(
      `shows/search/title?title=${encodeURIComponent(query || "")}&country=us`,
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Movie search failed with status ${response.status}`);
    }

    return response.json();
  }

  async getMovieById(id) {
    const apiKEY = getApiKey();

    if (!apiKEY) {
      throw new Error("Movie API key is not configured.");
    }

    const movieId = id || "110";
    const url = buildApiUrl(`shows/${movieId}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Movie lookup failed with status ${response.status}`);
    }

    return response.json();
  }

  // ********************************************************* Rapid API ************************************************************
  // async searchShows(query) {
  //   const url = `${apiURL}/shows/search/title?title=${query}&country=us&show_type=movie&output_language=en`;

  //   const response = await fetch(url, options);

  //   if (!response.ok) {
  //     throw new Error("Search failed.");
  //   }
  //   const data = await convertToJson(response);

  //   return data;
  // }

  // async getMovieById(id) {
  //   const newId = id || "110";
  //   const url = `${apiURL}/shows/${newId}?output_language=en&country=us`;

  //   const response = await fetch(url, options);
  //   console.log("Response: ", response);

  //   if (!response.ok) {
  //     throw new Error("Unable to load movie.");
  //   }
  //   const data = await convertToJson(response);
  //   console.log("Response json: ", data);

  //   return data;
  // }
}

// async function convertToJson(res) {
//   const jsonResponse = await res.json();
//   if (res.ok) {
//     return jsonResponse;
//   } else {
//     throw { name: "servicesError", message: jsonResponse };
//   }
// }

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

// export async function searchShows(query) {
//   const url = `${apiURL}/shows/search/title?title=${encodeURIComponent(query)}&country=us&show_type=movie&output_language=en`;

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     throw new Error("Search failed.");
//   }

//   return await response.json();
// }

// export async function getShow(id) {
//   const newId = id || "110";
//   const url = `${apiURL}/shows/${newId}?output_language=en&country=us`;

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     throw new Error("Unable to load movie.");
//   }

//   return await response.json();
// }

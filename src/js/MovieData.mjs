// const baseURL = import.meta.env.VITE_SERVER_URL;

const apiBaseURL = (
  import.meta.env.VITE_API_URL || "https://api.movieofthenight.com/v4/"
).replace(/\/?$/, "/");

const DEFAULT_API_KEY = "motn-key-v4-Qwv0rNZBLxxT3Z87bi1DonkHJ4qX5I8X";

function getApiKey() {
  const apiKey = import.meta.env.VITE_API_KEY || DEFAULT_API_KEY;
  // console.log("Movie API key loaded:", apiKey ? "present" : "missing");
  return apiKey;
}

function buildApiUrl(path) {
  return new URL(path.replace(/^\/+/, ""), apiBaseURL).toString();
}

export default class MovieData {
  constructor() {}

  // --------------------------------
  async searchShows(query) {
    const apiKEY = await getApiKey();
    if (!apiKEY) {
      throw new Error("Movie API key is not configured.");
    }
    const url = `${apiBaseURL}shows/search/title?country=us&title=${query}&series_granularity=show&show_type=movie&output_language=en`;

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
  // --------------------------------
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

  // --------------------------------
  async getTopShows(service, showType) {
    const url = new URL(`${apiBaseURL}shows/top`);
    url.searchParams.set("country", "us");
    url.searchParams.set("service", service);
    url.searchParams.set("show_type", showType);

    const options = {
      method: "GET",
      headers: {
        "X-API-Key": DEFAULT_API_KEY,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Movie search failed with status ${response.status}`);
    }
    const movies = await convertToJson(response);
    return movies;
  }

  // -------------------------------- For Future Use ----------
  // async getNewestShows(service, showType) {
  //   // const url = new URL(`${apiBaseURL}changes`);
  //   const url = new URL(`${apiBaseURL}shows/top`);

  //   url.searchParams.set("country", "us");
  //   // url.searchParams.set("catalogs", service);
  //   // url.searchParams.set("service", service);
  //   // url.searchParams.set("change_type", "new");
  //   // url.searchParams.set("item_type", "show");
  //   url.searchParams.set("show_type", showType);
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-API-Key": DEFAULT_API_KEY,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await fetch(url, options);
  //   if (!response.ok) {
  //     throw new Error(`Movie search failed with status ${response.status}`);
  //   }
  //   // console.log("Response: ", response);
  //   const movies = await convertToJson(response);
  //   // console.log("Newest Changes: ", movies.changes);
  //   // console.log("Newest Movies: ", movies);
  //   // console.log("Type of movies.shows:", typeof movies.shows);
  //   // console.log("Is movies.shows an array?", Array.isArray(movies.shows));
  //   // console.log("Value of movies.shows:", movies.shows);
  //   return movies;
  // }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// --------------------------------
async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

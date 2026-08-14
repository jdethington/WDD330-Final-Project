// API imports
const rapidAPI = import.meta.env.VITE_RAPID_API_KEY;
const movieOfTheNightAPI = import.meta.env.VITE_MOTN_API_KEY;
// ============================================================
import * as streamingAvailability from "streaming-availability";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class MovieData {
  constructor() {
    this.primaryClient = new streamingAvailability.Client(
      new streamingAvailability.Configuration({
        apiKey: movieOfTheNightAPI,
      }),
    );

    this.fallbackClient = new streamingAvailability.Client(
      new streamingAvailability.Configuration({
        apiKey: rapidAPI,
      }),
    );

    if (
      getLocalStorage("FM-client") === true ||
      getLocalStorage("FM-client") === false
    ) {
      this.usePrimary = getLocalStorage("FM-client");
    } else {
      setLocalStorage("FM-client", true);
      this.usePrimary = getLocalStorage("FM-client");
    }
    this.firstAttempt = true;
  }

  // Clean. Placing clients in constructor===================================
  async searchShowsByTitle(query, type = "movie") {
    const response = await this.searchStreaming("title", {
      title: query,
      country: "us",
      showType: type,
      seriesGranularity: "show",
    });
    // console.log("Response: ", response);
    return response;
  }

  async getMovieById(id) {
    const response = await this.searchStreaming("show", {
      id: id,
      country: "us",
      seriesGranularity: "show",
    });
    // console.log("Response: ", response);
    return response;
  }

  async getTopShows(service = "prime", showType = "movie") {
    const response = await this.searchStreaming("top", {
      country: "us",
      service: service,
      showType: showType,
    });
    // console.log("Response: ", response);
    return response;
  }

  async searchShowsByFilters(
    catalogs = "prime",
    showType = "movie",
    genres = "",
    keyword,
  ) {
    const response = await this.searchStreaming("filters", {
      country: "us",
      catalogs: catalogs,
      showType: showType,
      genres: genres,
      genresRelation: "or",
      showOriginalLanguage: "en",
      // yearMin: 1975,
      // yearMax: 2026,
      keyword: keyword,
      // orderDirection: "desc",
      // orderBy: "popularity_alltime",
      // ratingMin: 1,
      // ratingMax: 100,
    });
    // console.log("Response: ", response);
    return response;
  }

  async getChanges(
    change = "new",
    type = "show",
    catalogs = "prime.free, netflix.free",
    showType = "movie",
    daysChange = 7, // days change
  ) {
    const response = await this.searchStreaming("changes", {
      changeType: change,
      itemType: type,
      from: getMidnightTimestamp(daysChange), // Unix Time Stamp
      country: "us",
      catalogs: [catalogs],
      showType: showType,
      // orderDirection: "desc",
    });
    // console.log("Response: ", response);
    const showsArray = Object.values(response.shows);
    // console.log("Shows Array: ", showsArray);
    return showsArray;
  }

  async searchStreaming(type, data) {
    const client = this.usePrimary ? this.primaryClient : this.fallbackClient;

    try {
      switch (type) {
        case "show":
          // Single show or movie by id
          return client.showsApi.getShow(data);

        case "title":
          return client.showsApi.searchShowsByTitle(data);

        case "filters":
          return client.showsApi.searchShowsByFilters(data);

        case "top":
          return client.showsApi.getTopShows(data);

        case "changes":
          return client.changesApi.getChanges(data);

        default:
          throw new Error(
            `Unknown type: "${type}".  Use "show", "title", or "filters".`,
          );
      }
    } catch (error) {
      if ((error.status === 429 || error.status === 403) && this.firstAttempt) {
        console.warn("Primary API quota exhausted - switching to secondary.");
        this.usePrimary
          ? setLocalStorage("FM-client", false)
          : setLocalStorage("FM-client", true);
        this.firstAttempt = false;
        return this.searchStreaming(type, data);
      }
      // Both APIs Exhausted!
      throw error;
    }
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getMidnightTimestamp(daysAgo = 7) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(0, 0, 0, 0);
  return Math.floor(date.getTime() / 1000);
}

// --------------------------------
// async function convertToJson(res) {
//   const jsonResponse = await res.json();
//   if (res.ok) {
//     return jsonResponse;
//   } else {
//     throw { name: "servicesError", message: jsonResponse };
//   }
// }

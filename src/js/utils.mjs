// const STORAGE_KEY = "Movie-favorites";
export const STORAGE_KEY = "FM-favorites";

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Return parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const item = urlParams.get(param);
  return item;
}
// Renders Details of a single movie using a template and a parent element
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  // if clear is true we need to clear out the contents of the parent.
  if (callback) {
    callback(data);
  }
}
// Renders a list of shows using a template function and a parent element
export function renderListWithTemplate(
  templateCard,
  parentElement,
  movies,
  position,
  clear = false,
) {
  const container = parentElement;
  if (clear) {
    container.innerHTML = "";
  }
  if (!movies.shows) {
    movies.forEach((movie) => {
      const card = document.createElement("div");

      card.className = "movie-card";
      card.dataset.id = movie.id;

      card.innerHTML = templateCard(movie);
      container.appendChild(card);
    });
  } else {
    movies.shows.forEach((movie) => {
      const card = document.createElement("div");

      card.className = "movie-card";
      card.dataset.id = movie.id;

      card.innerHTML = templateCard(movie);
      container.appendChild(card);
    });
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");

  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(footerTemplate, footerElement);
}

// Function to display a list items (cast, genres, directors...)
export function formatList(items) {
  const formatted = items
    ?.slice(0, 5)
    .map((item) =>
      typeof item === "string" ? item : item?.name ?? item?.title ?? "",
    )
    .filter(Boolean)
    .join(", ");

  return formatted || "Unavailable";
}
// Crates a list of services that are streaming the movie 
export function streamingServices(movie) {
  // console.log("PreMap", movie.streamingOptions.us);
  if (!movie.streamingOptions.us) {
    return [];
  }
  const services = [
    ...new Map(
      movie.streamingOptions.us.map((option) => [
        option.service.id,
        option.service,
      ]),
    ).values(),
  ];
  // console.log("Streaming", services);

  const serviceHTML = services
    .map(
      (service) => `
        <a href="${service.homePage}" target="_blank">
          <img
              class="service-logo"
              src="${service.imageSet.lightThemeImage}"
              alt="${service.name}"
              title="${service.name}"
              loading="lazy">
        </a>
    `,
    )
    .join("");

  return serviceHTML;
}
// Sets the Movie Title to title case 
export function toTitleCase(str) {
  if (!str) return "";
  const small = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "in",
    "of",
    "on",
    "or",
    "the",
    "to",
    "with",
  ]);
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word, i, arr) => {
      if (i === 0 || i === arr.length - 1 || !small.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

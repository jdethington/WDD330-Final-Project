// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// const STORAGE_KEY = "Movie-favorites";
export const STORAGE_KEY = "MF-favorites";

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
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

  movies.forEach((movie) => {
    const card = document.createElement("div");

    card.className = "movie-card";
    card.dataset.id = movie.id;

    card.innerHTML = templateCard(movie);
    container.appendChild(card);
  });
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

// Create alert message to display at top of
export function alertMessage(message, scroll = true, duration = 3000) {
  // 1. Create alert element
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("form-alert");
  // 2. Set content (Proper </p> tag & 'X' inside <span>)
  alert.innerHTML = `<p class="alert form-alert">${message}</p><span class="delete-button">X</span>`;
  // 3. Add close button listener
  // ====================== USE setClick function from earlier =================================================
  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN" || e.target.innerText === "X") {
      main.removeChild(this);
    }
  });
  // 4. Select <main> and insert alert at the top
  const main = document.querySelector("main");
  main.prepend(alert);
  // 5. Scroll to top if requested
  if (scroll) {
    window.scrollTo(0, 0);
  }
  // alert removed after duration
  setTimeout(() => {
    main.removeChild(alert);
  }, duration);
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
//
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
              title="${service.name}">
        </a>
    `,
    )
    .join("");

  return serviceHTML;
}

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

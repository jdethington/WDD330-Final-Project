// export function displayMovie(movie) {

//     const container =
//         document.querySelector("#movieContainer");

//     container.innerHTML = `
//         <h2>${movie.title}</h2>

//         <img
//             src="${movie.imageSet.verticalPoster.w480}"
//             alt="${movie.title}">

//         <p>${movie.overview}</p>

//         <p>
//             <strong>Year:</strong>
//             ${movie.releaseYear}
//         </p>
//     `;
// }
// =================================================================

export function displayResults(data) {
  const container = document.querySelector("#results");

  container.innerHTML = "";

  data.forEach((show) => {
    const card = document.createElement("div");

    card.className = "movie-card";

    card.dataset.id = show.id;

    card.innerHTML = `
        <div class="card-inner">

            <div class="card-front">
                <img src="${show.imageSet.verticalPoster.w240}" alt="${show.title} poster" loading="lazy">
            </div>

            <div class="card-back">
                <h3>${show.title}</h3>

                <p>${show.releaseYear}</p>

                <p>${show.runtime ?? "Unknown"} min</p>

                <p>Rating: ⭐${show.rating}/100</p>

                <div class="btn btn-details"><a href="/moviePage/index.html?id=${show.id}">
                    More Details</a>
                </div>

            </div>

        </div>
    `;
    container.appendChild(card);
  });
}

export function displayMovie(movie) {
  const formatList = (items) =>
    items
      ?.slice(0, 5)
      .map((item) =>
        typeof item === "string" ? item : item?.name ?? item?.title ?? "",
      )
      .filter(Boolean)
      .join(", ") || "Unavailable";

  const cast = formatList(movie.cast);
  const genre = formatList(movie.genres);
  const directors = formatList(movie.directors);

  //   console.log("Cast", cast);
  //   console.log("genre", genre);
  //   console.log("directors", directors);

  document.querySelector("#details").innerHTML = `
        <img class="hero-background" src="${movie.imageSet.horizontalBackdrop.w720}" alt="${movie.title} backdrop" loading="lazy">
        
        <h2>${movie.title}</h2>

        <img src="${movie.imageSet.verticalPoster.w480}">

        <p>${movie.overview}</p>

        <p><strong>Released:</strong> ${movie.releaseYear}</p>

        <p><strong>Genres:</strong> ${genre}</p>
        <p><strong>Director:</strong> ${directors}</p>
        <p><strong>Cast:</strong> ${cast}</p>
        `;
}
// <p><strong>Streaming:</strong> ${movie.streamingOptions.us.service.name} min</p>

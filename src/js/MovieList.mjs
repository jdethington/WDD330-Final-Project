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
        <img
            src="${show.imageSet.verticalPoster.w240}"
            alt="${show.title}">
        <h3>${show.title}</h3>
    `;
    container.appendChild(card);
  });
}

export function displayMovie(movie) {
  document.querySelector("#details").innerHTML = `
        <h2>${movie.title}</h2>

        <img src="${movie.imageSet.verticalPoster.w480}">

        <p>${movie.overview}</p>

        <p><strong>Released:</strong> ${movie.releaseYear}</p>

        <p><strong>Runtime:</strong> ${movie.runtime} min</p>
    `;
}

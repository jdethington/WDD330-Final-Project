export function displayMovie(movie) {

    const container =
        document.querySelector("#movieContainer");

    container.innerHTML = `
        <h2>${movie.title}</h2>

        <img
            src="${movie.imageSet.verticalPoster.w480}"
            alt="${movie.title}">

        <p>${movie.overview}</p>

        <p>
            <strong>Year:</strong>
            ${movie.releaseYear}
        </p>
    `;
}
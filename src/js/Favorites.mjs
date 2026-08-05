import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// =====================================================================
const STORAGE_KEY = "MF-favorites";

export function isFavorite(id) {
  const favorites = getLocalStorage(STORAGE_KEY) || [];
  return favorites.some((movie) => movie.id === id);
}

export function addFavorite(movie) {
  const favorites = getLocalStorage(STORAGE_KEY) || [];

  if (!favorites.some((f) => f.id === movie.id)) {
    favorites.push(movie);
    setLocalStorage(STORAGE_KEY, favorites);
  }
}

export function removeFavorite(id) {
  const favorites = getLocalStorage(STORAGE_KEY).filter(
    (movie) => movie.id !== id,
  );
  setLocalStorage(STORAGE_KEY, favorites);
}

export function toggleFavorite(movie) {
  const favoriteMovie = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    year: movie.releaseYear,
    genres: movie.genres,
    directors: movie.directors,
    cast: movie.cast,
    rating: movie.rating,
    runtime: movie.runtime,
    poster: movie.imageSet.verticalPoster.w240,
    backdrop: movie.imageSet.horizontalBackdrop.w1080,
    streamingOptions: movie.streamingOptions.us,
  };
  if (isFavorite(movie.id)) {
    removeFavorite(movie.id);
  } else {
    addFavorite(favoriteMovie);
  }
}

// =====================================================================

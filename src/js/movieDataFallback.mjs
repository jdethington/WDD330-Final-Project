const FALLBACK_MOVIES = [
  {
    id: "110",
    title: "Star Wars",
    overview: "A classic space adventure with heroes, villains, and destiny.",
    releaseYear: 1977,
    runtime: 125,
    rating: 85,
    imageSet: {
      verticalPoster: {
        w240: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=240&q=80",
        w360: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=360&q=80",
      },
    },
  },
  {
    id: "170",
    title: "Return of the Jedi",
    overview: "The Rebel Alliance faces the Empire in a final showdown.",
    releaseYear: 1983,
    runtime: 135,
    rating: 82,
    imageSet: {
      verticalPoster: {
        w240: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=240&q=80",
        w360: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=360&q=80",
      },
    },
  },
  {
    id: "200",
    title: "The Matrix",
    overview: "A hacker discovers reality is an illusion.",
    releaseYear: 1999,
    runtime: 136,
    rating: 88,
    imageSet: {
      verticalPoster: {
        w240: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=240&q=80",
        w360: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=360&q=80",
      },
    },
  },
];

export function buildFallbackMovieResults(
  movies = FALLBACK_MOVIES,
  query = "",
) {
  if (!query) return movies;

  const normalizedQuery = query.toLowerCase();

  return movies.filter((movie) => {
    const title = movie.title?.toLowerCase() ?? "";
    const overview = movie.overview?.toLowerCase() ?? "";
    return (
      title.includes(normalizedQuery) || overview.includes(normalizedQuery)
    );
  });
}

export function findFallbackMovieById(movies = FALLBACK_MOVIES, id = "") {
  return movies.find((movie) => movie.id === id);
}

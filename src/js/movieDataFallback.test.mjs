import test from "node:test";
import assert from "node:assert/strict";
import { buildFallbackMovieResults, findFallbackMovieById } from "./movieDataFallback.mjs";

test("buildFallbackMovieResults filters by query", () => {
  const movies = [
    { id: "1", title: "Star Wars", overview: "Space adventure" },
    { id: "2", title: "The Matrix", overview: "Sci-fi thriller" },
  ];

  const results = buildFallbackMovieResults(movies, "matrix");

  assert.equal(results.length, 1);
  assert.equal(results[0].title, "The Matrix");
});

test("findFallbackMovieById returns the matching movie", () => {
  const movies = [
    { id: "1", title: "Star Wars", overview: "Space adventure" },
    { id: "2", title: "The Matrix", overview: "Sci-fi thriller" },
  ];

  const movie = findFallbackMovieById(movies, "2");

  assert.equal(movie?.title, "The Matrix");
});

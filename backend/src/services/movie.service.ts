import { movies } from "../db/movies.db";
import { Movie } from "../types/Movie";

export const getAllMovies = (): Movie[] => {
  return movies;
};

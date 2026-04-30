import { db } from "../db";
import { Movie } from "../types/Movie";

export const getAllMovies = (): Movie[] => {
  const stmt = db.prepare("SELECT * FROM movies");
  return stmt.all() as Movie[];
};

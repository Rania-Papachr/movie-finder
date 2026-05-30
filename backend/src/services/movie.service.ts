import { db } from "../db";
import { Movie } from "../types/Movie";

export const getAllMovies = (): Movie[] => {
  const stmt = db.prepare("SELECT * FROM movies");
  return stmt.all() as Movie[];
};

export const getMovieById = (id: number): Movie | undefined => {
  const stmt = db.prepare("SELECT * FROM movies WHERE id = ?");
  return stmt.get(id) as Movie | undefined;
};

type NewMovie = Omit<Movie, "id">;

export const createMovie = (movie: NewMovie): Movie => {
  const stmt = db.prepare(`
    INSERT INTO movies (title, year, description, rating, genre, imageUrl, favorite)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    movie.title,
    movie.year,
    movie.description,
    movie.rating,
    movie.genre,
    movie.imageUrl,
    movie.favorite,
  );

  return {
    id: Number(result.lastInsertRowid),
    ...movie,
  };
};

type UpdateMovie = Omit<Movie, "id">;

export const updateMovie = (id: number, movie: UpdateMovie): Movie | null => {
  const stmt = db.prepare(`
    UPDATE movies
    SET title = ?, year = ?, description = ?, rating = ?, genre = ?, imageUrl = ?
    WHERE id = ?
  `);

  const result = stmt.run(
    movie.title,
    movie.year,
    movie.description,
    movie.rating,
    movie.genre,
    movie.imageUrl,
    id,
  );

  // if no rows updated → movie not found
  if (result.changes === 0) {
    return null;
  }

  return {
    id,
    ...movie,
  };
};

export const deleteMovie = (id: number): boolean => {
  const stmt = db.prepare("DELETE FROM movies WHERE id = ?");
  const result = stmt.run(id);

  return result.changes > 0;
};

export const toggleFavorite = (id: number): Movie | null => {
  const movie = getMovieById(id);

  if (!movie) {
    return null;
  }

  const newFavorite = movie.favorite ? 0 : 1;

  const stmt = db.prepare(`
    UPDATE movies
    SET favorite = ?
    WHERE id = ?
  `);

  stmt.run(newFavorite, id);

  return {
    ...movie,
    favorite: newFavorite,
  };
};

export const getFavoriteMovies = (): Movie[] => {
  const stmt = db.prepare(`
    SELECT *
    FROM movies
    WHERE favorite = 1
  `);

  return stmt.all() as Movie[];
};

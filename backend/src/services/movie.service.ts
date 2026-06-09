import { db } from "../db";
import { Movie } from "../types/Movie";

export const getAllMovies = (): Movie[] => {
  const stmt = db.prepare("SELECT * FROM movies");

  const movies = stmt.all() as (Omit<Movie, "favorite"> & {
    favorite: number;
  })[];

  return movies.map((movie) => ({
    ...movie,
    favorite: Boolean(movie.favorite),
  }));
};

export const getMovieById = (id: number): Movie | undefined => {
  const stmt = db.prepare("SELECT * FROM movies WHERE id = ?");
  const movie = stmt.get(id) as
    | (Omit<Movie, "favorite"> & { favorite: number })
    | undefined;

  if (!movie) {
    return undefined;
  }

  return {
    ...movie,
    favorite: Boolean(movie.favorite),
  };
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

  const newFavorite = !movie.favorite;
  const dbValue = newFavorite ? 1 : 0;
  const stmt = db.prepare(`
    UPDATE movies
    SET favorite = ?
    WHERE id = ?
  `);

  stmt.run(dbValue, id);

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

  const movies = stmt.all() as (Omit<Movie, "favorite"> & {
    favorite: number;
  })[];

  return movies.map((movie) => ({
    ...movie,
    favorite: true,
  }));
};

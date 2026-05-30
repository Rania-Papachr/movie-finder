import { Request, Response } from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleFavorite,
  getFavoriteMovies,
} from "../services/movie.service";

export const getMovies = (req: Request, res: Response) => {
  try {
    const movies = getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    if (error) {
      res.status(500).json({ message: "Failed to fetch movies" });
    }
  }
};

export const getMovie = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  const movie = getMovieById(id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json(movie);
};

export const createMovieHandler = (req: Request, res: Response) => {
  const { title, year, description, rating, genre, imageUrl } = req.body;

  if (!title || !year || !genre || !imageUrl) {
    return res.status(400).json({
      message: "Missing required fields (title, year, genre, imageUrl)",
    });
  }

  try {
    const newMovie = createMovie({
      title,
      year,
      description,
      rating,
      genre,
      imageUrl,
      favorite: 0,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create movie" });
  }
};

export const updateMovieHandler = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  const { title, year, description, rating, genre, imageUrl } = req.body;

  if (!title || !year || !genre || !imageUrl) {
    return res.status(400).json({
      message: "Missing required fields (title, year, genre, imageUrl)",
    });
  }

  try {
    const updatedMovie = updateMovie(id, {
      title,
      year,
      description,
      rating,
      genre,
      imageUrl,
      favorite: 0,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update movie" });
  }
};

export const deleteMovieHandler = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  try {
    const deleted = deleteMovie(id);

    if (!deleted) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete movie" });
  }
};

export const toggleFavoriteHandler = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid movie ID",
    });
  }

  const movie = toggleFavorite(id);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  res.status(200).json(movie);
};

export const getFavorites = (req: Request, res: Response) => {
  try {
    const favorites = getFavoriteMovies();

    res.status(200).json(favorites);
  } catch {
    res.status(500).json({
      message: "Failed to fetch favorites",
    });
  }
};

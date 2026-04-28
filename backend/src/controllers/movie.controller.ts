import { Request, Response } from "express";
import { getAllMovies } from "../services/movie.service";

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

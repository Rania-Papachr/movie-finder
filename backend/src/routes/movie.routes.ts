import { Router } from "express";
import {
  getMovies,
  getMovie,
  createMovieHandler,
  updateMovieHandler,
  deleteMovieHandler,
  toggleFavoriteHandler,
  getFavorites,
} from "../controllers/movie.controller";

const router = Router();

router.get("/", getMovies);
router.get("/favorites", getFavorites);
router.get("/:id", getMovie);
router.post("/", createMovieHandler);
router.put("/:id", updateMovieHandler);
router.delete("/:id", deleteMovieHandler);
router.patch("/:id/favorite", toggleFavoriteHandler);

export default router;

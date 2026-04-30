import { Router } from "express";
import {
  getMovies,
  getMovie,
  createMovieHandler,
  deleteMovieHandler,
} from "../controllers/movie.controller";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", createMovieHandler);
router.put("/:id", updateMovieHandler);
router.delete("/:id", deleteMovieHandler);

export default router;

import { Router } from "express";
import { getMovies } from "../controllers/movie.controller";

const router = Router();

router.get("/", getMovies);

export default router;

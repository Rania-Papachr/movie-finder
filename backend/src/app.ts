import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movie.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Movie API is running 🎬" });
});

export default app;

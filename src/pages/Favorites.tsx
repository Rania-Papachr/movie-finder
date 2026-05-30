import { useState, useEffect } from "react";
import axios from "axios";

import { Box, Typography } from "@mui/material";
import type { Movie } from "../types/movie";
import MovieCard from "@/components/MovieCard";

const getFavorites = async () => {
  const res = await axios.get("http://localhost:5000/movies/favorites");
  return res.data;
};

const Favorites = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await getFavorites();
        setMovies(data);
      } catch (error) {
        console.error("Failed to load favorites", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        ❤️ Favorites
      </Typography>

      {movies.length === 0 ? (
        <Typography>No favorite movies yet.</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Favorites;

import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import { Box, Typography } from "@mui/material";
import type { Movie } from "../types/movie";
import MovieCard from "@/components/MovieCard";
import PageLoader from "@/components/PageLoader";
import { getFavoriteMovies } from "@/services/movieApi";

const Favorites = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await getFavoriteMovies();
      setMovies(data);
      enqueueSnackbar("Favorite movies loaded successfully.", {
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to load favorites", error);

      enqueueSnackbar("Failed to load favorite movies.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadFavorites();
    };

    init();
  }, []);

  if (loading) {
    return <PageLoader message="Loading favorite movies..." />;
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
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavorite={loadFavorites}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Favorites;

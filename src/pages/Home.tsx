import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { Box, Button, Typography } from "@mui/material";
import MovieCards from "../components/MovieCards";
import PageLoader from "../components/PageLoader";
import type { Movie } from "../types/movie";

import { getMovies } from "@/services/movieApi";

const Home = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDeleteMovie = (id: string | number) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const handleToggleFavorite = (updatedMovie: Movie) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)),
    );
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        enqueueSnackbar("Failed to load movies.", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [enqueueSnackbar]);

  if (isLoading) {
    return <PageLoader message="Movies are loading, please wait..." />;
  }

  if (movies.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography>
          No movies found. Please add some movies to see them here.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/add-movie");
          }}
        >
          Add Movie
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Movies
      </Typography>
      <MovieCards
        movies={movies}
        onDelete={handleDeleteMovie}
        onToggleFavorite={handleToggleFavorite}
      />
    </Box>
  );
};

export default Home;

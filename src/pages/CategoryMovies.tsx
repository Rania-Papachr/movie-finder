import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { Box, Typography } from "@mui/material";

import MovieCards from "../components/MovieCards";

import type { Movie } from "../types/movie";
import PageLoader from "@/components/PageLoader";
import { getMovies } from "@/services/movieApi";

const CategoryMovies = () => {
  const { category } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
        const data = await getMovies();

        const filteredMovies = category
          ? data.filter((movie: Movie) => movie.genre === category)
          : data;

        setMovies(filteredMovies);
      } catch (err) {
        console.error(err);

        enqueueSnackbar("Failed to load movies.", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, enqueueSnackbar]);

  if (isLoading) {
    return <PageLoader message={`Loading ${category} movies... `} />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          textTransform: "capitalize",
          fontWeight: 700,
          textAlign: "center",
          mb: 6,
          letterSpacing: 0.5,
        }}
      >
        {category} Movies
      </Typography>
      {movies.length > 0 ? (
        <MovieCards
          movies={movies}
          onDelete={handleDeleteMovie}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <Typography>No movies found</Typography>
      )}
      ;
    </Box>
  );
};

export default CategoryMovies;

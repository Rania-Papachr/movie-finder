import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Box, Typography } from "@mui/material";

import MovieCards from "../components/MovieCards";

import type { Movie } from "../types/movie";
import PageLoader from "@/components/PageLoader";

const CategoryMovies = () => {
  const { category } = useParams();

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
        const res = await axios.get("http://localhost:5000/movies");

        const filteredMovies = res.data.filter(
          (movie: Movie) => movie.genre === category,
        );

        setMovies(filteredMovies);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  if (isLoading) {
    return <PageLoader message={`Loading ${category} movies... `} />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h3"
        sx={{
          textTransform: "capitalize",
          mb: 4,
          textAlign: "center",
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

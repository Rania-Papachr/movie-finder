import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Box, Typography, CircularProgress } from "@mui/material";

import MovieCards from "../components/MovieCards";

import type { Movie } from "../types/movie";

const CategoryMovies = () => {
  const { category } = useParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => {
        const filteredMovies = res.data.filter(
          (movie: Movie) => movie.genre === category,
        );
        setMovies(filteredMovies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [category]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
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
        <MovieCards movies={movies} />
      ) : (
        <Typography>No movies found</Typography>
      )}
      ;
    </Box>
  );
};

export default CategoryMovies;

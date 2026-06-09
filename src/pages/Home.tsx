import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MovieCards from "../components/MovieCards";
import PageLoader from "../components/PageLoader";
import type { Movie } from "../types/movie";
import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

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
        const res = await axios.get("http://localhost:5000/movies");
        setMovies(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error("Error fetching API:", err);
      }
    };
    fetchMovies();
  }, []);

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

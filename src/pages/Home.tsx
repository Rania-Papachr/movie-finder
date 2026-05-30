import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MovieCards from "../components/MovieCards";
import type { Movie } from "../types/movie";
import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => {
        setMovies(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error fetching API:", err);
      });
  }, []);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (movies.length === 0) {
    return (
      <Box>
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
    <Box>
      <MovieCards movies={movies} />
    </Box>
  );
};

export default Home;

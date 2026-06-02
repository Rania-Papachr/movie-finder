import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Box, Typography, Chip, CircularProgress } from "@mui/material";

import type { Movie } from "../types/movie";

const MovieDetails = () => {
  const { id } = useParams(); //Give me the value from the URL parameter called id.

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`http://localhost:5000/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

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

  if (!movie) {
    return <Typography variant="h4">Movie not found</Typography>;
  }

  return (
    <>
      <div>
        <h1>Movie Details Page</h1>
        <p>Movie id: {id}</p>
      </div>
      <Box
        sx={{
          p: 4,
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        <Box
          component="img"
          src={movie.imageUrl}
          alt={movie.title}
          sx={{
            width: 300,
            borderRadius: 3,
            objectFit: "cover",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        />

        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {movie.title}
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.7, mt: 1 }}>
            {movie.year}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Chip
              label={movie.genre}
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                textTransform: "capitalize",
              }}
            />

            <Chip
              label={`⭐ ${movie.rating}`}
              sx={{
                backgroundColor: "#e53935",
                color: "#fff",
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              mt: 3,
              lineHeight: 1.8,
              opacity: 0.9,
            }}
          >
            {movie.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MovieDetails;

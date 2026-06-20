import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { Box, Typography, Chip } from "@mui/material";

import type { Movie } from "../types/movie";
import PageLoader from "@/components/PageLoader";
import { getMovieById } from "@/services/movieApi";

const MovieDetails = () => {
  const { id } = useParams(); //Give me the value from the URL parameter called id.

  const { enqueueSnackbar } = useSnackbar();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        enqueueSnackbar("Invalid movie ID.", {
          variant: "error",
        });
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await getMovieById(Number(id));
        setMovie(data);

        enqueueSnackbar("Movie loaded successfully.", {
          variant: "success",
        });
      } catch (err) {
        console.error(err);

        enqueueSnackbar("Failed to load movie details.", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id, enqueueSnackbar]);

  if (isLoading) {
    return <PageLoader message="Loading movie details..." />;
  }

  if (!movie) {
    return <Typography variant="h4">Movie not found</Typography>;
  }

  return (
    <>
      <Box
        sx={{
          p: 4,
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          maxWidth: 1100,
          mx: "auto",
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

        <Box
          sx={{
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {movie.title}
          </Typography>

          <Typography variant="h6" sx={{ color: "text.secondary", mt: 1 }}>
            {movie.year}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Chip
              label={movie.genre}
              sx={{
                bgcolor: "rgba(245,158,11,0.12)",
                color: "primary.main",
                textTransform: "capitalize",
              }}
            />

            <Chip
              label={`⭐ ${movie.rating}`}
              sx={{
                bgcolor: "rgba(245,158,11,0.12)",
                color: "primary.main",
                fontWeight: 600,
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              lineHeight: 1.8,
              mt: 3,
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

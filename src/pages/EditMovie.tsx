import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieForm from "@/components/MovieForm";
import type { Movie } from "@/types/movie";
import PageLoader from "@/components/PageLoader";
import { Typography } from "@mui/material";
import { getMovieById } from "@/services/movieApi";

const EditMovie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(Number(id));
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <PageLoader message="Movie is loading..." />;
  }
  if (!movie) {
    return <Typography variant="h6">Movie not found</Typography>;
  }

  return <MovieForm mode="edit" initialData={movie} />;
};

export default EditMovie;

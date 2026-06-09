import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import MovieForm from "@/components/MovieForm";
import type { Movie } from "@/types/movie";
import PageLoader from "@/components/PageLoader";
import { Typography } from "@mui/material";

const EditMovie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/movies/${id}`);
        setMovie(res.data);
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

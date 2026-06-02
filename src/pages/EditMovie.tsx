import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import MovieForm from "@/components/MovieForm";
import type { Movie } from "@/types/movie";

const EditMovie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  return <MovieForm mode="edit" initialData={movie} />;
};

export default EditMovie;

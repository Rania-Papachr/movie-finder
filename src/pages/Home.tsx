import { useEffect, useState } from "react";
import axios from "axios";

import MovieCards from "../components/MovieCards";
import type { Movie } from "./types/movie";

const Home = () => {
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

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

  useEffect(() => {
    axios.get("http://localhost:5000/movies/1").then((res) => {
      console.log(res.data);
    });
  }, []);

  const newMovie: Movie = {
    title: "Test",
    year: 1996,
    description: "bcaofao",
    genre: "comedy",
    imageUrl: "https://picsum.photos/300/450",
    rating: 6,
  };

  const onSubmit = () => {
    axios.post("http://localhost:5000/movies", newMovie).then((res) => {
      console.log(res);
    });
  };
  const onDelete = () => {
    axios.delete("http://localhost:5000/movies/6").then((res) => {
      console.log(res);
    });
  };

  const onEdit = () => {
    axios.put("http://localhost:5000/movies/2", newMovie).then((res) => {
      console.log(res);
    });
  };
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎬 Movie Finder</h1>

      <p>Backend says:</p>
      <h2>{message || "Loading..."}</h2>

      <button onClick={onSubmit}>Create</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>

      {movies.length > 0 && <MovieCards movies={movies} />}

      <h1>Movies</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        movies?.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <h4>{movie.year}</h4>
            <img src={movie.imageUrl} />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

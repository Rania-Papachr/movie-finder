import { useEffect, useState } from "react";
import axios from "axios";

type GenreTypes = "comedy" | "horror" | "drama";

type Movie = {
  id: string;
  title: string;
  year: number;
  description: string;
  rating: number;
  genre: GenreTypes;
  imageUrl: string;
};

function App() {
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        return console.error("Error fetching API:", err);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/movies/1")
  //     .then((res) => setMovie(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  // const addMovie = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:5000/movies", {
  //       title: "Gladiator",
  //       year: 2000,
  //       description: "A Roman general seeks revenge.",
  //       rating: 8.5,
  //       genre: "drama",
  //       imageUrl: "https://via.placeholder.com/300x450?text=Gladiator",
  //     });

  //     console.log("Created:", res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const updateMovie = async () => {
  //   try {
  //     const res = await axios.put("http://localhost:5000/movies/1", {
  //       title: "Inception UPDATED",
  //       year: 2010,
  //       description: "Dream within a dream.",
  //       rating: 9.0,
  //       genre: "drama",
  //       imageUrl: "https://via.placeholder.com/300x450?text=Inception",
  //     });

  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const deleteMovie = async (id: number) => {
  //   try {
  //     const res = await axios.delete(`http://localhost:5000/movies/${id}`);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎬 Movie Finder</h1>

      <p>Backend says:</p>
      <h2>{message || "Loading..."}</h2>

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
}

export default App;

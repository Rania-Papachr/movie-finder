import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
};

function App() {
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
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
          </div>
        ))
      )}
    </div>
  );
}

export default App;

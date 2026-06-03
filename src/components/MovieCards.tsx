import type { Movie } from "../types/movie.ts";
import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

type Props = {
  movies: Movie[];
  onDelete: (id: string | number) => void;
};

const MovieCards = ({ movies, onDelete }: Props) => {
  return (
    <Box
      component="section"
      sx={{
        maxWidth: 1200,
        mx: "auto",
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {movies.map((movie) => (
        <Box key={movie.id} sx={{ width: 250 }}>
          <MovieCard movie={movie} onDelete={onDelete} />
        </Box>
      ))}
    </Box>
  );
};

export default MovieCards;

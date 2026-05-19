import type { Movie } from "../types/movie.ts";
import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

type Props = {
  movies: Movie[];
};

const MovieCards = ({ movies }: Props) => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,

        justifyContent: "center",
      }}
    >
      {movies.map((movie) => (
        <Box key={movie.id} sx={{ width: 250 }}>
          <MovieCard movie={movie} />
        </Box>
      ))}
    </Box>
  );
};

export default MovieCards;

import {
  Card,
  CardMedia,
  Box,
  CardContent,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { Movie } from "../types/movie";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Card
      sx={{
        width: "100%",
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.imageUrl}
        alt={movie.title}
        sx={{ aspectRatio: "2/3", objectFit: "cover" }}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://placehold.co/300x450?text=No+Image";
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 25%, rgba(0,0,0,0.2) 60%, transparent)",
        }}
      />

      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(6px)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.15)",
          },
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>

      <Chip
        label={`⭐ ${movie.rating.toFixed(1)}`}
        size="small"
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "#fff",
          fontWeight: 600,
          backdropFilter: "blur(6px)",
        }}
      />

      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {movie.title}
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {movie.year}
        </Typography>

        {/* <Typography
          variant="body2"
          sx={{
            mt: 1,
            opacity: 0.7,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.description}
        </Typography> */}

        <Box sx={{ mt: 1 }}>
          <Chip
            label={movie.genre}
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#fff",
              textTransform: "capitalize",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;

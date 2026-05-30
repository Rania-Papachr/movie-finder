import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Box, Typography, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import type { Movie } from "../types/movie";
import { toggleFavorite } from "../services/movieApi";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate();

  const [isFav, setIsFav] = useState(movie.favorite);

  const handleDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleEdit = () => {
    navigate(`/edit-movie/${movie.id}`);
  };

  const handleDelete = () => {
    console.log("delete", movie.id);
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevents opening details page

    const updatedMovie = await toggleFavorite(Number(movie.id)); //call my api function and give it the id of the movie i clicked on.

    setIsFav(updatedMovie.favorite);
  };

  const actionButtonStyle = {
    width: 40,
    height: 40,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(8px)",
    transition: "0.2s ease",

    "&:hover": {
      transform: "scale(1.08)",
      backgroundColor: "rgba(255,255,255,0.16)",
    },
  };

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "#1e1e1e",
        color: "#fff",

        transition: "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
        },

        "&:hover .hover-overlay": {
          opacity: 1,
        },

        "&:hover .action-layer": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      {/* CLICK SURFACE */}

      <Box
        onClick={handleDetails}
        sx={{
          position: "relative",
          cursor: "pointer",
        }}
      >
        {/* IMAGE */}

        <Box
          component="img"
          src={movie.imageUrl}
          alt={movie.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = "https://placehold.co/300x450?text=No+Image";
          }}
          sx={{
            width: "100%",
            aspectRatio: "2 / 3",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* GRADIENT */}

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",

            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 15%, rgba(0,0,0,0.2) 55%, transparent)",
          }}
        />

        {/* HOVER */}

        <Box
          className="hover-overlay"
          sx={{
            position: "absolute",
            inset: 0,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            opacity: 0,
            transition: "opacity 0.25s ease",

            backgroundColor: "rgba(0,0,0,0.28)",
            backdropFilter: "blur(2px)",

            pointerEvents: "none",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            View Details
          </Typography>
        </Box>

        {/* CONTENT */}

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            {movie.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              mb: 1,
            }}
          >
            {movie.year}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              label={movie.genre}
              size="small"
              sx={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#fff",
                textTransform: "capitalize",
              }}
            />

            <Chip
              label={`⭐ ${movie.rating.toFixed(1)}`}
              size="small"
              sx={{
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "#fff",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ACTION */}

      <Box
        className="action-layer"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,

          display: "flex",
          gap: 1,

          opacity: 0,
          transform: "translateY(-10px)",
          transition: "all 0.22s ease",

          zIndex: 20,
        }}
      >
        <IconButton sx={actionButtonStyle} onClick={handleFavorite}>
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <IconButton sx={actionButtonStyle} onClick={handleEdit}>
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={handleDelete}
          sx={{
            ...actionButtonStyle,

            "&:hover": {
              transform: "scale(1.08)",
              backgroundColor: "rgba(255,80,80,0.45)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default MovieCard;

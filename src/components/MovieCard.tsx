import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Box, Typography, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ConfirmDialog from "../components/ConfirmDialog";
import type { Movie } from "../types/movie";
import { toggleFavorite, deleteMovie } from "../services/movieApi";

const MovieCard = ({
  movie,
  onDelete,
  onToggleFavorite,
}: {
  movie: Movie;
  onDelete?: (id: string | number) => void;
  onToggleFavorite?: (movie: Movie) => void;
}) => {
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleEdit = () => {
    navigate(`/edit-movie/${movie.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => setOpenDeleteDialog(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMovie(movie.id);
      setOpenDeleteDialog(false);
      onDelete?.(movie.id); //use parent state}
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const updatedMovie = await toggleFavorite(movie.id);

    onToggleFavorite?.(updatedMovie);
  };

  const actionButtonStyle = {
    width: 40,
    height: 40,
    color: "text.primary",
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
        bgcolor: "background.paper",
        color: "text.primary",

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

            bgcolor: "rgba(0,0,0,0.4)",
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
                bgcolor: "rgba(59,130,246,0.12)",
                color: "primary.main",
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            />

            <Chip
              label={`⭐ ${movie.rating.toFixed(1)}`}
              size="small"
              sx={{
                bgcolor: "rgba(59,130,246,0.15)",
                color: "primary.main",
                fontWeight: 600,
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
          {movie.favorite ? (
            <FavoriteIcon sx={{ color: "primary.main" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "text.primary" }} />
          )}
        </IconButton>

        <IconButton sx={actionButtonStyle} onClick={handleEdit}>
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={handleDeleteClick}
          sx={{
            ...actionButtonStyle,

            "&:hover": {
              transform: "scale(1.08)",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Movie?"
        description={`Are you sure you want to delete "${movie.title}"?`}
        confirmText="Delete"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </Card>
  );
};

export default MovieCard;

import { useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { movieSchema, type MovieFormData } from "@/schemas/movie";
import MovieTextField from "./MovieTextField";
import MovieSelectField from "@/components/MovieSelectField";

export type MovieData = {
  id: string;
} & MovieFormData;

type MovieFormProps = {
  mode: "add" | "edit";
  initialData?: MovieData;
};

const MIN_YEAR = 1888;
const MAX_YEAR = new Date().getFullYear();

const yearOptions = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => {
  const year = String(MAX_YEAR - i);

  return {
    value: year,
    label: year,
  };
});

const genreOptions = [
  { value: "drama", label: "Drama" },
  { value: "comedy", label: "Comedy" },
  { value: "horror", label: "Horror" },
];

const MovieForm = ({ mode, initialData }: MovieFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<MovieFormData>({
    mode: "all",
    resolver: zodResolver(movieSchema),
    defaultValues: initialData || {
      title: "",
      year: "",
      genre: "",
      description: "",
      rating: 0,
      imageUrl: "",
    },
  });

  const onSubmit = async (data: MovieFormData) => {
    setIsLoading(true);
    try {
      if (mode === "add") {
        await axios.post("http://localhost:5000/movies", data);
        reset();
      } else {
        await axios.put(
          `http://localhost:5000/movies/${initialData?.id}`,
          data,
        );
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 5,
          borderRadius: 4,
          bgcolor: "background.paper",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 1,
              letterSpacing: 0.5,
            }}
          >
            {mode === "add" ? "Add Movie" : "Edit Movie"}
          </Typography>

          {/* TITLE */}

          <MovieTextField name="title" label="Title" control={control} />

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {/* YEAR */}
            <MovieSelectField
              name="year"
              label="Year"
              control={control}
              options={yearOptions}
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            />

            {/* RATING */}
            <MovieTextField
              name="rating"
              label="Rating"
              control={control}
              type="number"
            />
          </Box>

          {/* GENRE */}

          <MovieSelectField
            name="genre"
            label="Genre"
            control={control}
            options={genreOptions}
            sx={{
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          />

          {/* DESCRIPTION */}

          <MovieTextField
            name="description"
            label="Description"
            control={control}
            multiline
            rows={4}
            placeholder="Write a brief description of the movie..."
          />

          {/* IMAGE URL */}

          <MovieTextField name="imageUrl" label="Image URL" control={control} />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={!isDirty || !isValid || isLoading}
              sx={{
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                width: "100%",
              }}
              endIcon={isLoading && <CircularProgress size={20} />}
            >
              {isLoading
                ? "Saving..."
                : mode === "add"
                  ? "Add Movie"
                  : "Save Changes"}
            </Button>
            <Button
              type="button"
              //type button to prevent the default type submit Reset
              variant="outlined"
              disabled={isLoading}
              onClick={() => reset()}
              sx={{
                borderRadius: 2,
                width: "100%",
                color: "text.secondary",
                borderColor: "rgba(255,255,255,0.15)",
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MovieForm;

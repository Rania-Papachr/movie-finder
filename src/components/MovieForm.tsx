import { useState } from "react";

import { useSnackbar } from "notistack";

import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { movieSchema, type MovieFormData } from "@/schemas/movie";
import MovieTextField from "./MovieTextField";
import MovieSelectField from "@/components/MovieSelectField";
import { createMovie, updateMovie } from "@/services/movieApi";
import MovieCard from "@/components/MovieCard";

export type MovieData = {
  id: number;
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
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<MovieFormData>({
    mode: "all",
    resolver: zodResolver(movieSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          favorite: Boolean(initialData.favorite),
        }
      : {
          title: "",
          year: "",
          genre: "",
          description: "",
          rating: 0,
          imageUrl: "",
          favorite: false,
        },
  });

  const watchedValues = useWatch({ control });

  const previewMovie = {
    id: initialData?.id ?? 0,
    title: watchedValues.title || "",
    year: watchedValues.year || "",
    genre: watchedValues.genre || "",
    rating: watchedValues.rating || 0,
    description: watchedValues.description || "",
    imageUrl: watchedValues.imageUrl || "",
    favorite: Boolean(watchedValues.favorite),
  };

  const onSubmit = async (data: MovieFormData) => {
    setIsLoading(true);

    try {
      if (mode === "add") {
        await createMovie({ ...data });

        enqueueSnackbar("Movie created successfully ", {
          variant: "success",
        });

        reset();
      } else if (initialData?.id) {
        await updateMovie(initialData.id, data);

        enqueueSnackbar("Movie updated successfully ", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error saving movie:", error);

      enqueueSnackbar(
        mode === "add" ? "Failed to create movie." : "Failed to update movie.",
        {
          variant: "error",
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 6,
          letterSpacing: 0.5,
        }}
      >
        {mode === "add" ? "Add Movie" : "Edit Movie"}
      </Typography>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          gap: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            maxWidth: 700,
            p: 5,
            borderRadius: 4,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 1,
              letterSpacing: 0.5,
            }}
          >
            {mode === "add"
              ? "Fill out the details below."
              : "Update the movie details below."}
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

          <Controller
            name="favorite"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Favorite"
              />
            )}
          />

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
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            p: 5,
            borderRadius: 4,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 1,
              letterSpacing: 0.5,
            }}
          >
            Live Preview
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 350 }}>
              <MovieCard movie={previewMovie} preview />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieForm;

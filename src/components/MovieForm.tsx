import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  TextField,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { movieSchema, type MovieFormData } from "@/schemas/movie";
import MovieTextField from "./MovieTextField";

export type MovieData = {
  id: string;
} & MovieFormData;

type MovieFormProps = {
  mode: "add" | "edit";
  initialData?: MovieData;
};

const MovieForm = ({ mode, initialData }: MovieFormProps) => {
  const navigate = useNavigate();
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
    try {
      if (mode === "add") {
        const res = await axios.post("http://localhost:5000/movies", data);
        console.log("Movie added");
        console.log(res.data);
      } else {
        const res = await axios.put(
          `http://localhost:5000/movies/${initialData?.id}`,
          data,
        );

        console.log("Movie updated");
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
    navigate("/");
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

          <MovieTextField
            name="title"
            label="Title"
            control={control}
            required
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {/* YEAR */}
            <MovieTextField
              name="year"
              label="Year"
              control={control}
              required
            />
            {/* RATING */}

            <Controller
              name="rating"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Rating"
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                />
              )}
            />
          </Box>

          {/* GENRE */}

          <Controller
            name="genre"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error} required>
                <InputLabel id="genre-label">Genre</InputLabel>

                <Select
                  {...field}
                  labelId="genre-label"
                  label="Genre"
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "rgba(255,255,255,0.03)",
                  }}
                >
                  <MenuItem value="drama">Drama</MenuItem>
                  <MenuItem value="comedy">Comedy</MenuItem>
                  <MenuItem value="horror">Horror</MenuItem>
                </Select>

                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* DESCRIPTION */}

          <MovieTextField
            name="description"
            label="Description"
            control={control}
            multiline
            rows={4}
            placeholder="Write a brief description of the movie..."
            required
          />

          {/* <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Description"
                multiline
                placeholder="Write a brief description of the movie..."
                rows={4}
                {...field}
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ?? `${field.value.length}/500`
                }
                required
              />
            )}
          /> */}

          {/* IMAGE URL */}

          <Controller
            name="imageUrl"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Image URL"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
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
              disabled={!isDirty || !isValid}
              sx={{
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                width: "100%",
              }}
            >
              {mode === "add" ? "Add Movie" : "Save Changes"}
            </Button>
            <Button
              type="button"
              //type button to prevent the default type submit Reset
              variant="outlined"
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

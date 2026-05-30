import axios from "axios";
import { Button, Box, Typography, TextField, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { movieSchema, type MovieFormData } from "@/schemas/movie";

export type MovieData = {
  id: string;
} & MovieFormData;

type MovieFormProps = {
  mode: "add" | "edit";
  initialData?: MovieData;
};

const MovieForm = ({ mode, initialData }: MovieFormProps) => {
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
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.08)",
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
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {mode === "add" ? "Add Movie" : "Edit Movie"}
          </Typography>

          {/* TITLE */}

          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Title"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {/* YEAR */}

            <Controller
              name="year"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Year"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
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
                />
              )}
            />
          </Box>

          {/* GENRE */}

          <Controller
            name="genre"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Genre"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* DESCRIPTION */}

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Description"
                multiline
                rows={4}
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

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
                fontWeight: "bold",
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

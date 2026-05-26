import axios from "axios";
import { Button, Box, Typography, TextField } from "@mui/material";
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
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
      }}
    >
      <Typography variant="h4">
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
          />
        )}
      />

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

      <Button type="submit" variant="contained">
        {mode === "add" ? "Add Movie" : "Save Changes"}
      </Button>
      <Button type="button" variant="outlined" onClick={() => reset()}>
        {" "}
        //type button to prevent the default type submit Reset
      </Button>
    </Box>
  );
};

export default MovieForm;

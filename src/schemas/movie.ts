import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().nonempty("poutses").min(1, "Title is required"),
  year: z.string().nonempty().length(4, "Year must be 4 characters"),
  genre: z.string().nonempty().min(1, "Genre is required"),
  description: z.string().nonempty().min(1, "Descrition is required"),
  rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(10, "Rating must be at most 10"),
  imageUrl: z.string().nonempty(),
});

export type MovieFormData = z.infer<typeof movieSchema>;

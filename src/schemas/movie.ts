import { z } from "zod";

export const movieSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .trim()
    .max(100, "Title must be at most 100 characters"),
  year: z.string().nonempty("Year is required"),
  genre: z.string().nonempty("Genre is required"),
  description: z
    .string()
    .nonempty("Description is required")
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  rating: z
    .number("Rating must be a number")
    .min(0, "Rating must be at least 0")
    .max(10, "Rating must be at most 10"),
  imageUrl: z.string().nonempty("Image URL is required"),
  favorite: z.boolean(),
});

export type MovieFormData = z.infer<typeof movieSchema>;

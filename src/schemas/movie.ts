import { z } from "zod";

export const movieSchema = z.object({
  title: z
    .string()
    .nonempty("poutses")
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  year: z
    .string()
    .nonempty("Year is required")
    .regex(/^\d+$/, "Year must contain only numbers")
    .length(4, "Year must be 4 characters")
    .refine((val) => {
      //refine is used for real world validation that is not covered by the basic string validation
      const year = Number(val); //Convert string to a number
      const currentYear = new Date().getFullYear(); //Get the current year

      return year <= currentYear; //Check if year inserted is lees or equai to the current year
    }, "Year cannot be in the future")
    .refine((val) => {
      const year = Number(val);
      return year >= 1888;
    }, "Year must be 1888 or later"),
  genre: z
    .string()
    .refine(
      (value) => ["drama", "horror", "comedy"].includes(value),
      "Genre is required",
    ),
  description: z
    .string()
    .nonempty("Description is required")
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(10, "Rating must be at most 10"),
  imageUrl: z.string().nonempty("Image URL is required"),
});

export type MovieFormData = z.infer<typeof movieSchema>;

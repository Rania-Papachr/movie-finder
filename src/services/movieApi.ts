import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "http://localhost:5000/movies";

export const toggleFavorite = async (id: number): Promise<Movie> => {
  const res = await axios.patch<Movie>(`${API_URL}/${id}/favorite`);

  return res.data;
};

export const deleteMovie = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

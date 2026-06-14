import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "http://localhost:5000/movies";

// GET all movies
export const getMovies = async (): Promise<Movie[]> => {
  const res = await axios.get<Movie[]>(API_URL);
  return res.data;
};

// GET one movie
export const getMovieById = async (id: number): Promise<Movie> => {
  const res = await axios.get<Movie>(`${API_URL}/${id}`);
  return res.data;
};

// CREATE movie
export const createMovie = async (movie: Omit<Movie, "id">): Promise<Movie> => {
  const res = await axios.post<Movie>(API_URL, movie);
  return res.data;
};

// UPDATE full movie
export const updateMovie = async (
  id: number,
  movie: Partial<Movie>,
): Promise<Movie> => {
  const res = await axios.put<Movie>(`${API_URL}/${id}`, movie);
  return res.data;
};

// GET favorite movies
export const getFavoriteMovies = async (): Promise<Movie[]> => {
  const res = await axios.get<Movie[]>(`${API_URL}/favorites`);
  return res.data;
};

//TOGGLE favorite
export const toggleFavorite = async (id: number): Promise<Movie> => {
  const res = await axios.patch<Movie>(`${API_URL}/${id}/favorite`);

  return res.data;
};

//DELETE movie
export const deleteMovie = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

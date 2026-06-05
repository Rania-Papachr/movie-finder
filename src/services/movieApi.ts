import axios from "axios";

const API_URL = "http://localhost:5000/movies";

export const toggleFavorite = async (id: number) => {
  const res = await axios.patch(`${API_URL}/${id}/favorite`);

  return res.data; //returns the updated movie after toggling the favorite status 0 or 1 ;
};

export const deleteMovie = async (id: string | number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

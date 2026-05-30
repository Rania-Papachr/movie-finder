import axios from "axios";

export const toggleFavorite = async (id: number) => {
  const res = await axios.patch(`http://localhost:5000/movies/${id}/favorite`, {
    method: "PATCH", //update only part of the movie (just the favorite status)
  });

  return res.data; //returns the updated movie after toggling the favorite status 0 or 1 ;
};

import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams(); //Give me the value from the URL parameter called id.
  return (
    <div>
      <h1>Movie Details Page</h1>
      <p>Movie id: {id}</p>
    </div>
  );
};

export default MovieDetails;

import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import DramaMovies from "./pages/DramaMovies";
import ComedyMovies from "./pages/ComedyMovies";
import HorrorMovies from "./pages/HorrorMovies";
import AddMovie from "./pages/AddMovie";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/drama" element={<DramaMovies />} />
        <Route path="/categories/comedy" element={<ComedyMovies />} />
        <Route path="/categories/horror" element={<HorrorMovies />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;

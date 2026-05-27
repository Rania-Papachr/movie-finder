import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CategoryMovies from "./pages/CategoryMovies";
import AddMovie from "./pages/AddMovie";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import EditMovie from "@/pages/EditMovie";

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:category" element={<CategoryMovies />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />
      </Routes>
    </>
  );
};

export default App;

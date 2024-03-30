import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import FavPage from './Components/layouts/FavPage';
import DisplayMovies from './Components/layouts/DisplayMovies';
import Navbar from './Components/layouts/Navbar';
import AsideCategories from './Components/layouts/AsideCategories';
import MovieDetails from './Components/layouts/MovieDetails';

function App() {
  const [genre, setGenre] = useState({})
  const [currentMovie, setCurrentMovie] = useState({})
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DisplayMovies genre={genre} setCurrentMovie={setCurrentMovie} currentMovie={currentMovie} />} />
        <Route path="/fav" element={<FavPage />} />
        <Route path="/details" element={<MovieDetails />} />
      </Routes>
      <AsideCategories setGenre={setGenre} />
      <footer className="border-gray-200 bg-gray-100 justify-center w-full mt-5 flex items-center mx-auto p-4">
        <p> &copy; Lancelle Clara </p>
      </footer>
    </div >
  );
}

export default App;

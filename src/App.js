import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import HandleFavoritePage from './Components/HandleFavoritePage';
import DisplayMovies from './Components/DisplayMovies';
import Navbar from './Components/layouts/Navbar';
import AsideCategories from './Components/AsideCategories';
import HandleMovieDetails from './Components/HandleMovieDetails';
import HandleRatedPage from './Components/HandleRatedPage';

function App() {
  const [genre, setGenre] = useState({})
  const [currentMovie, setCurrentMovie] = useState({})
  return (
    <div className='min-h-full'>
      <Navbar />
      <Routes>
        <Route path="/" element={<DisplayMovies genre={genre} setCurrentMovie={setCurrentMovie} currentMovie={currentMovie} />} />
        <Route path="/fav" element={<HandleFavoritePage />} />
        <Route path="/rated" element={<HandleRatedPage />} />
        <Route path="/details" element={<HandleMovieDetails />} />
      </Routes>
      <AsideCategories setGenre={setGenre} />
      <footer className="border-gray-200 bg-gray-100 justify-center w-full mt-5 flex items-center mx-auto p-4">
        <p> &copy; Lancelle Clara </p>
      </footer>
    </div >
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import HandleFavoritePage from './Components/HandleFavoritePage';
import Navbar from './Components/layouts/Navbar';
import HandleAsideGenres from './Components/HandleAsideGenres';
import HandleMovieDetails from './Components/HandleMovieDetails';
import HandleRatedPage from './Components/HandleRatedPage';
import HandleMovieGallery from './Components/HandleMovieGallery';

function App() {
  const [genre, setGenre] = useState({})
  const [currentMovie, setCurrentMovie] = useState({})
  return (
    <div className='min-h-full'>
      <Navbar />
      <Routes>
        <Route path="/" element={<HandleMovieGallery genre={genre} setCurrentMovie={setCurrentMovie} currentMovie={currentMovie} />} />
        <Route path="/fav" element={<HandleFavoritePage />} />
        <Route path="/rated" element={<HandleRatedPage />} />
        <Route path="/details" element={<HandleMovieDetails />} />
      </Routes>
      <HandleAsideGenres setGenre={setGenre} />
      <footer className="border-gray-200 bg-gray-100 justify-center w-full mt-5 flex items-center mx-auto p-4">
        <p> &copy; Lancelle Clara </p>
      </footer>
    </div >
  );
}

export default App;

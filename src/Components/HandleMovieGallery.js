import React, { useEffect, useState } from "react";
import Card from "./layouts/MovieGallery";
import MovieGallery from "./layouts/MovieGallery";

function HandleMovieGallery({ genre, setCurrentMovie, currentMovie }) {
    const [movies, setMovie] = useState([]);

    // if genre => display movie by genre else display trending movies
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/${genre.id ? `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_genres=${genre.id}` : "trending/movie/day?language=en-EN"}`
            , {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                },
            }).then(response => response.json())
            .then(response => setMovie([...response.results]))
            .catch(err => console.error(err));
    }, [genre.id]);

    if (movies.length > 0) {
        return (
            <MovieGallery movies={movies} genre={genre} />
        );
    }
}

export default HandleMovieGallery;
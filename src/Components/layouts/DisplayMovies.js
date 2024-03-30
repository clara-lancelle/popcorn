import React, { useEffect, useState } from "react";
import Card from "./Card";

function DisplayMovies({ genre, setCurrentMovie, currentMovie }) {
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
            <>
                <h1 className="my-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 underline underline-offset-3 decoration-8 decoration-red-400 text-center py-5">{genre.name ? genre.name : "Trending movies"}</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {movies?.map((movie, index) => (
                        <Card movie={movie} key={index} setCurrentMovie={setCurrentMovie} />
                    ))}
                </div>
            </>
        );
    }
}

export default DisplayMovies;
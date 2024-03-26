import React, { useEffect, useState } from "react";
import Card from "./layouts/card";
function MovieList() {
    const [movies, setMovie] = useState([]);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-EN'", {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
            },
        }).then(response => response.json())
            .then(response => setMovie([...movies, ...response.results])
            )
            .catch(err => console.error(err));
    }, []);
    if (movies.length > 0) {
        return (
            <>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 underline underline-offset-3 decoration-8 decoration-red-400 text-center py-5">Trending movies</h1>
                <div>
                    {movies?.map((movie, index) => (
                        <Card movie={movie} index={index} />
                    ))}
                </div>
            </>
        );
    }
}
export default MovieList;

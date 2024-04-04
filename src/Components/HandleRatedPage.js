import React, { useEffect, useState } from "react";
import MovieList from "./layouts/MovieList";

function HandleRatedPage() {
    const [ratedMovies, setRatedMovies] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/account/21099296/rated/movies?language=en-US&page=1&sort_by=created_at.asc`
            , {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                },
            }).then(response => response.json())
            .then(response => setRatedMovies([...response.results]))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-[77vh]">
            <h1 className="my-5 pb-4 text-4xl font-extrabold leading-none text-center tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Rated movies</h1>
            {ratedMovies.length > 0
                &&
                <MovieList list={ratedMovies} />
                ||
                <p className="text-center">No rated movie yet ..</p>
            }

        </div>
    )
}
export default HandleRatedPage;
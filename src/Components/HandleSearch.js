import React, { useEffect, useState } from "react";
import MovieList from "./layouts/MovieList";

function HandleSearch(search) {
    const [results, setResults] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
            },
        })
            .then(response => response.json())
            .then(response => setResults([...response.results]))
            .catch(err => console.error(err));
    }, [search])

    return (
        <>
            {Object.keys(results).length > 0 &&
                <MovieList setResults={setResults} list={results} />
            }
        </>
    )
}
export default HandleSearch;
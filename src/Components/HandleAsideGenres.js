import React, { useEffect, useState } from "react";
import AsideGenres from "./layouts/AsideGenres";

function HandleAsideGenres({ setGenre }) {
    const [genreList, setGenreList] = useState([]);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
            },
        }).then(response => response.json())
            .then(response => setGenreList([...response.genres])
            )
            .catch(err => console.error(err));
    }, []);
    return (
        <>
            <AsideGenres setGenre={setGenre} genreList={genreList} />
        </>
    )
}
export default HandleAsideGenres;
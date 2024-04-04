import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import MovieDetails from "./layouts/MovieDetails";

function HandleMovieDetails() {
    const [movieDetails, setMovieDetails] = useState({});
    const [movieId, setMovieId] = useState(false);
    const [rate, setRate] = useState(0)
    const [favoriteStatus, setFavoriteStatus] = useState(false)
    const [queryParameters] = useSearchParams()

    movieId != queryParameters.get('movie') && setMovieId(queryParameters.get('movie'))

    // display details of a movie
    useEffect(() => {
        if (movieId) {
            fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits,account_states`
                , {
                    method: "GET",
                    headers: {
                        accept: 'application/json',
                        Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                    },
                })
                .then(response => response.json())
                .then(response => (
                    setMovieDetails({ ...response }),
                    setRate(Math.round(response.vote_average / 2)),
                    setFavoriteStatus(response.account_states.favorite)
                ))
                .catch(err => console.error(err));
        }
    }, [movieId]);

    return (
        <MovieDetails movieId={movieId} rate={rate} movieDetails={movieDetails} favoriteStatus={favoriteStatus} setFavoriteStatus={setFavoriteStatus} />
    )
}
export default HandleMovieDetails;
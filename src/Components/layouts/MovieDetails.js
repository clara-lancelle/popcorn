import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    useSearchParams,
    BrowserRouter
} from "react-router-dom"

function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState({});
    const [movieId, setMovieId] = useState(false);
    const [rate, setRate] = useState(0)
    const [queryParameters] = useSearchParams()
    movieId != queryParameters.get('movie') && setMovieId(queryParameters.get('movie'))
    // display details of a movie
    useEffect(() => {
        if (movieId) {
            fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
                , {
                    method: "GET",
                    headers: {
                        accept: 'application/json',
                        Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                    },
                }).then(response => response.json())
                .then(response => (
                    setMovieDetails({ ...response }),
                    setRate(Math.round(response.vote_average / 2))
                ))
                .then(response => (
                    fetch(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
                        , {
                            method: "GET",
                            headers: {
                                accept: 'application/json',
                                Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                            },
                        }).then(response => response.json())
                        .then(response => (
                            setMovieDetails((movieDetails) => ({ ...movieDetails, ...response })
                            ))
                        ))
                )
                .catch(err => console.error(err));
        }
    }, [movieId]);
    return (
        <>
            <h1 className="my-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 underline underline-offset-3 decoration-8 decoration-red-400 text-center py-5">{movieDetails.title}</h1>
            <div className="grid grid-cols-2 w-[95%] md:w-[70%] mx-auto">
                {console.log(movieDetails)}
                <div className="w-full">
                    <img className="object-cover" src={`https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`} alt="movie poster" />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="w-full flex flex-row items-center">
                        {/* rate with stars */}

                        {[...Array(rate).keys()].map(item => (
                            <svg key={item} className=" w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                        {[...Array(rate)].length < 5 &&
                            [...Array(5 - rate).keys()].map(item => (
                                <svg key={item} className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            ))
                        }
                        <p className="text-xs ml-3 text-gray-500 italic">{movieDetails.vote_average} /10</p>
                    </div>
                    <div className="w-full">
                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-800">
                            <li className="flex gap-1 items-center py-3 sm:py-4 text-sm font-medium text-gray-900 truncate">Release date : <p className="text-gray-800 font-thin">{movieDetails?.release_date}</p></li>
                            <li className="flex gap-1 items-center py-3 sm:py-4 text-sm font-medium text-gray-900 truncate">Budget : <p className="text-gray-800 font-thin">{movieDetails?.budget}</p></li>
                            <li className="py-3 sm:py-4 text-gray-800 font-thin">{movieDetails.overview}</li>
                            <li className="flex flex-col gap-1 py-3 sm:py-4 text-sm font-medium text-gray-900 truncate">Productions companies :
                                {movieDetails.production_companies?.map(({ name, ...item }) => (
                                    <p className="text-gray-800 font-thin w-full" key={name}>{name}</p>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MovieDetails;
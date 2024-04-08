import React, { useEffect, useState } from "react";
import star_fill from './svg/star_fill.svg';

function HandleRate({ movieId }) {

    const [userRate, setUserRate] = useState(0)

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/account_states`
            , {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                },
            })
            .then(response => response.json())
            .then(response => setUserRate(response.rated.value)
            )
            .catch(err => console.error(err));
    }, [movieId])

    const deleteRate = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating`,
            {
                method: "DELETE",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                },
            })
            .then(response => response.json())
            .then(response => (setUserRate(0)))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        if (userRate > 0) {
            fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/rating`,
                {
                    method: "POST",
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                    },
                    body: JSON.stringify({ value: userRate })
                })
                .then(response => response.json())
                .catch(err => console.error(err));
        }
    }, [userRate])

    return (
        <div className="py-3">
            <p className="text-sm font-medium text-gray-900 truncate pb-2 pt-5">Your rate</p>
            <div className="w-full flex flex-row items-center">
                {[...Array(5)].map((x, i) => (
                    userRate && (
                        (i + 1) <= userRate && (
                            <img key={i} className="w-4 h-4 text-yellow-300 ms-1 cursor-pointer" onClick={() => setUserRate(i + 1)} src={star_fill} />
                        )
                    )
                    ||
                    < svg key={i} onClick={() => setUserRate(i + 1)} className="w-4 h-4 text-gray-300 hover:text-yellow-300 ms-1 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        <title>increase your rate</title>
                    </svg>
                ))
                }
                {userRate &&
                    <svg onClick={() => deleteRate()} className="w-2.5 h-2.5 text-gray-400 mx-2 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        <title>delete your rate</title>
                    </svg>
                    ||
                    <></>
                }
                <p className="text-xs ml-3 text-gray-500 italic"> {userRate && userRate * 2}/10 </p>
            </div>
        </div >
    )
}
export default HandleRate;
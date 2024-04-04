import React, { useEffect, useState } from "react";
import heart from './svg/add_fav.svg'
import unHeart from './svg/remove_fav.svg'

function HandleFavoriteButton({ favoriteStatus, movieId, setFavoriteStatus }) {

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/account/21099296/favorite",
            {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
                },
                body: JSON.stringify({ media_type: 'movie', media_id: movieId, favorite: favoriteStatus })
            })
            .then(response => response.json())
            .catch(err => console.error(err));
    }, [favoriteStatus])

    return (
        <button type="button" onClick={() => setFavoriteStatus(!favoriteStatus)} className="text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" >
            {favoriteStatus &&
                <>
                    <img className="w-6 h-6 me-2 -ms-1" src={unHeart} />
                    Remove from favorites
                </>

                ||

                <>
                    <img className="w-6 h-6 me-2 -ms-1" src={heart} />
                    Add to favorites
                </>
            }
        </ button>
    )
}
export default HandleFavoriteButton;
import React from "react";

function Card({ movie, index }) {
    return (
        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
            </a>
            {console.log(movie)}
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">rate : {movie.vote_average} / 10</p>
                <a href="#" data-popover-target="popover-overview" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Overview
                </a>
                <div data-popover id="popover-overview" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                    <div className="px-3 py-2">
                        <p>{movie.overview}</p>
                    </div>
                    <div data-popper-arrow></div>
                </div>
            </div>
        </div>
    );
}

export default Card;
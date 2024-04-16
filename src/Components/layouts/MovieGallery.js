import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";


function MovieGallery({ movies, genre }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <h1 className="my-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 underline underline-offset-3 decoration-8 decoration-red-400 text-center py-5">{genre.name ? genre.name : "Trending movies"}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {movies?.map((movie, index) => (
                    <div key={movie.id} className="overflow-visible h-[28em] lg:h-[26em]">
                        <div className="flex flex-col h-full shadow-lg max-w-xs bg-white border border-gray-200 rounded-lg">
                            <img className="rounded-t-lg mx-auto mt-1" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="movie poster" />
                            <div className="flex flex-col h-full justify-end p-5 overflow-visible">
                                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900">{movie.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 ">rate : {movie.vote_average} / 10</p>
                                <div className="flex place-content-between gap-2 lg:flex-row items-center flex-col">
                                    <a data-popover-target="popover-overview" onClick={() => setShowModal(movie.id)} className="text-white bg-green-400 hover:cursor-pointer hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                        Overview
                                    </a>
                                    <Link to={`/details?movie=${movie.id}`} className="inline-flex font-medium items-center text-blue-600 hover:underline">
                                        Details
                                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                                        </svg>
                                    </Link>
                                </div>

                            </div>
                        </div>
                        {
                            showModal && showModal === movie.id ? (
                                <>
                                    <div className="relative top-[-25em] lg:top-[-23rem]">
                                        <div className="flex justify-end flex-col text-sm h-[28em] lg:h-[26em] text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm">
                                            <div className="px-3 py-2">
                                                <p>{movie.overview}</p>
                                            </div>
                                            <div data-popper-arrow></div>
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >Close</button>
                                        </div>
                                    </div>
                                </>
                            ) : null
                        }
                    </div >
                ))
                }
            </div >

        </>


    );
}

export default MovieGallery;
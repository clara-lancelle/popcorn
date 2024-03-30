import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Card({ movie, index, setCurrentMovie }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="overflow-visible h-[26em]">
            <div key={index} className="flex flex-col h-full shadow-lg max-w-xs bg-white border border-gray-200 rounded-lg">
                <img className="rounded-t-lg mx-auto mt-1" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="movie poster" />
                <div className="flex flex-col h-full justify-end p-5 overflow-visible">
                    <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900">{movie.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 ">rate : {movie.vote_average} / 10</p>
                    <div className="flex place-content-between">
                        <a data-popover-target="popover-overview" onClick={() => setShowModal(true)} className="text-white bg-green-400 hover:cursor-pointer hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            Overview
                        </a>
                        <Link to={`/details?movie=${movie.id}`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">
                            Details
                        </Link>
                    </div>

                </div>
            </div>
            {
                showModal ? (
                    <>
                        <div className="relative top-[-23rem]">
                            <div className="flex justify-end flex-col text-sm h-[26em] text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm">
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
    );
}

export default Card;
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function MovieList({ list, setResults = () => { } }) {
    return (
        <div className="z-20 w-full md:w-[70%] mx-auto bg-white divide-y overflow-hidden max-w-full divide-gray-100 rounded-lg shadow ">
            {list?.map(({ id, title, original_title, overview, release_date, backdrop_path, ...rest }) => (
                <div key={id} className="flex w-full px-4 py-3 hover:bg-gray-100">
                    <div className="flex-shrink-0">
                        <img className="object-contain h-20" src={`https://image.tmdb.org/t/p/w200/${backdrop_path}`} alt="movie poster" />
                    </div>
                    <div className="w-[70%] ps-3">
                        <p className=" text-sm mb-1.5 font-semibold text-gray-900">{title}</p>
                        {original_title != title &&
                            <p className=" text-sm mb-1.5 text-gray-800">Original title : <span className="italic text-xs text-gray-600">"{original_title}"</span></p>
                        }
                        <p className=" text-sm mb-1.5 text-gray-800">Release date : <span className="text-gray-500 text-xs mb-1.5">{release_date}</span></p>
                        <p className="text-xs mb-1.5 text-gray-500 max-w-full truncate">{overview}</p>
                        <Link to={`/details?movie=${id}`} onClick={() => setResults([])} className="text-xs text-blue-600">
                            see more
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MovieList;
import { Link } from "react-router-dom";

function MovieList({ list, setResults }) {
    return (
        <div className="z-20 w-full md:w-[70%] mx-auto bg-white divide-y overflow-hidden max-w-full divide-gray-100 rounded-lg shadow ">
            {list?.map(({ id, name = null, known_for_department = null, media_type, profile_path = null, known_for = [], title = null, original_title = null, overview = null, release_date = null, backdrop_path = null, ...rest }) => (
                <div key={id} className="flex w-full px-4 py-3 hover:bg-gray-100 flex-col md:flex-row">
                    <div className="flex-shrink-0">
                        <img className="object-contain h-20 sm:h" src={`https://image.tmdb.org/t/p/w200/${backdrop_path || profile_path}`} alt="movie poster" />
                    </div>
                    <div className="w-[70%] ps-3">
                        <p className="text-sm mb-1.5 font-semibold text-gray-900">{title || name}</p>
                        {media_type != "person" &&
                            <>
                                {original_title != title &&
                                    <p className=" text-sm mb-1.5 text-gray-800">Original title : <span className="italic text-xs text-gray-600">"{original_title}"</span></p>
                                }
                                <p className=" text-sm mb-1.5 text-gray-800">Release date : <span className="text-gray-500 text-xs mb-1.5">{release_date}</span></p>
                                <p className="text-xs mb-1.5 text-gray-500 max-w-full truncate">{overview}</p>
                                <Link to={`/details?movie=${id}`} onClick={() => setResults([])} className="text-xs text-blue-600">
                                    see more
                                </Link>
                            </>
                            ||
                            known_for &&
                            <>
                                <p className="text-sm mb-1.5 text-gray-800 text-gray-500 text-xs mb-1.5">{known_for_department}</p>
                                <div className="flex flex-col bg-gray-100 p-1">
                                    <p className="text-sm my-1.5 font-semibold underline text-gray-800">Known for : </p>
                                    {known_for.map(({ id, title, ...item }) => (
                                        <div className="flex gap-3 items-center">
                                            <p className="text-xs font-normal text-gray-700">{title}</p>
                                            <Link to={`/details?movie=${id}`} onClick={() => setResults([])} className="text-xs text-blue-600">
                                                see more
                                            </Link>
                                        </div>

                                    ))}
                                </div>
                            </>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MovieList;
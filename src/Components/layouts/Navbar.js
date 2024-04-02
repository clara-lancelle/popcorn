import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useDebounce from "../../useDebounce";

function Navbar() {
    const [search, setSearch] = useDebounce(1000);
    console.log(search)
    const [results, setResults] = useState([])
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
            },
        })
            .then(response => response.json())
            .then(response => setResults([...response.results]))
            .catch(err => console.error(err));
    }, [search])

    return (
        <nav className="border-gray-200 bg-gray-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">🍿 PopCorn</span>
                </Link>
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input type="search" onInput={(e) => setSearch(e.target.value.replace(/ /g, '+'))} id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." />
                </div>
                {console.log(results)}
                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" onInput={(e) => setSearch(e.target.value.replace(/ /g, '+'))} id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                    </div>
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <NavLink to="/fav" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">
                                Fav
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            {Object.keys(results).length > 0 &&
                <div className="z-20 w-full md:w-[70%] mx-auto bg-white divide-y overflow-hidden max-w-full divide-gray-100 rounded-lg shadow ">
                    {console.log('c')}
                    {results?.map(({ id, title, original_title, overview, release_date, backdrop_path, ...rest }) => (
                        <div className="flex w-full px-4 py-3 hover:bg-gray-100">
                            <div class="flex-shrink-0">
                                <img className="object-contain h-20" src={`https://image.tmdb.org/t/p/w200/${backdrop_path}`} alt="movie poster" />
                            </div>
                            <div class="w-[70%] ps-3">
                                <p class=" text-sm mb-1.5 font-semibold text-gray-900">{title}</p>
                                {original_title != title &&
                                    <p class=" text-sm mb-1.5 text-gray-800">Original title : <span className="italic text-xs text-gray-600">"{original_title}"</span></p>
                                }
                                <p class=" text-sm mb-1.5 text-gray-800">Release date : <span className="text-gray-500 text-xs mb-1.5">{release_date}</span></p>
                                <p className="text-xs mb-1.5 text-gray-500 max-w-full truncate">{overview}</p>
                                <Link to={`/details?movie=${id}`} onClick={() => setResults([])} className="text-xs text-blue-600">
                                    see more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </nav >
    );
}

export default Navbar;
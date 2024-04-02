import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useDebounce from "../../useDebounce";

function Search() {
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
            .then(response => setResults({ ...response.results }))
            .catch(err => console.error(err));
    }, [search])

    return (
        <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
            </div>
            <input type="search" onInput={(e) => setSearch(e.target.value.replace(/ /g, '+'))} id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." />
        </div>
    )
}
export default Search;
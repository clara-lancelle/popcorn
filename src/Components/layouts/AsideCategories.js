import React, { useEffect, useState } from "react";

function AsideCategories({ setGenre }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_TMDB_SECRET_KEY,
            },
        }).then(response => response.json())
            .then(response => setCategories([...categories, ...response.genres])
            )
            .catch(err => console.error(err));
    }, []);
    return (
        <>
            <div className="text-center">
                <button className="absolute top-20 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 0 focus:outline-none " type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
                    Show categories
                </button>
            </div>
            <div id="drawer-navigation" className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-navigation-label">
                <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Categories</h5>
                <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close</span>
                </button>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={() => setGenre({})} className="flex items-center p-2 text-gray-900 rounded-lg ">🔥 Trending movies</button>
                        </li>
                        {categories.map((categorie, index) => (
                            <li key={index}>
                                <button onClick={() => setGenre({ ...categorie })} className="flex items-center p-2 text-gray-900 rounded-lg ">{categorie.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default AsideCategories;
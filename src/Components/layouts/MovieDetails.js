import React from "react";
import HandleFavoriteButton from "../HandleFavoriteButton";
import star_fill from '../svg/star_fill.svg';
import star from '../svg/star.svg';
import HandleRate from "../HandleRate";
import HandleComments from "../HandleComments";

function MovieDetails({ movieId, rate, movieDetails, favoriteStatus, setFavoriteStatus }) {

    return (
        <>
            <h1 className="mt-5 mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 underline underline-offset-3 decoration-8 decoration-red-400 text-center py-5">{movieDetails.title}</h1>
            <h2 className="italic mb-5 pb-5 text-md text-gray-800 text-center font-thin">" {movieDetails.tagline} "</h2>
            <div className="flex flex-wrap md:flex-row gap-5 w-[95%] lg:w-[70%] mx-auto">
                <div className="w-full md:w-[35%] flex justify-center mb-2">
                    <img className="object-contain h-64" src={`https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`} alt="movie poster" />
                </div>
                <div className="flex md:w-[60%] flex-col gap-3">
                    <div className="w-full flex flex-row items-center my-3">
                        <HandleFavoriteButton movieId={movieId} favoriteStatus={favoriteStatus} setFavoriteStatus={setFavoriteStatus} />
                    </div>
                    <div className="w-full flex flex-row items-center">
                        {/* rate with stars */}

                        {[...Array(rate).keys()].map((item, index) => (
                            <img key={index} className="w-4 h-4 ms-1" src={star_fill} />
                        ))}
                        {[...Array(rate)].length < 5 &&
                            [...Array(5 - rate).keys()].map((item, index) => (
                                <img key={index} className="w-4 h-4 ms-1" src={star} />
                            ))
                        }
                        <p className="text-xs ml-3 text-gray-500 italic">{movieDetails.vote_average} /10 <span className="text-xs">({movieDetails.vote_count} votes)</span></p>
                    </div>
                    <HandleRate movieId={movieId} />
                    <div className="flex flex-row gap-1">
                        {movieDetails.genres?.map(({ id, name }) => (
                            <p key={id} className="text-xs italic text-gray-500">{name}</p>
                        ))}
                    </div>
                    <ul role="list" className=" w-full divide-y divide-gray-200 ">
                        <li className="flex gap-1 items-center py-3 sm:py-4 text-sm font-medium text-gray-900 truncate">Release date : <p className="text-gray-800 font-thin">{movieDetails?.release_date}</p></li>
                        <li className="flex gap-1 items-center py-3 sm:py-4 text-sm font-medium text-gray-900 truncate">Budget : <p className="text-gray-800 font-thin">{movieDetails.details > 0 ? movieDetails?.budget : "unknow"}</p></li>
                        <li className="py-3 sm:py-4 text-gray-600 text-sm ">{movieDetails.overview}</li>
                        <li className="flex flex-col gap-1 py-3 sm:py-4 text-sm font-medium text-gray-900 truncate">Productions companies :
                            {movieDetails.production_companies?.map(({ name, ...item }) => (
                                <p className="text-gray-800 font-thin w-full" key={name}>{name}</p>
                            ))}
                        </li>
                        {movieDetails.homepage &&
                            <li className="flex gap-1 items-center py-3 sm:py-4 text-sm font-medium text-gray-900 truncate">Homepage : <a className="text-blue-600 hover:underline">{movieDetails?.homepage}</a></li>
                        }
                    </ul>
                </div>
                {movieDetails.credits?.cast &&
                    <ul role="list" className="w-full my-5 md:justify-around divide-y divide-gray-200 flex flex-col md:flex-row flex-wrap gap-1 py-3 sm:py-4 text-sm font-medium text-gray-900 truncate gap-3">
                        <legend className="w-full text-center font-bold text-2xl my-3">Cast</legend>
                        {movieDetails.credits.cast.map(({ name, profile_path, character, ...items }) => (
                            character &&
                            <li key={name} className="flex md:w-1/3 items-center">
                                <div className="flex-shrink-0">
                                    <img className="w-12 h-14 object-cover object-top rounded-full" src={`https://image.tmdb.org/t/p/w200/${profile_path}`} alt="image" />
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-normal text-gray-900 truncate">
                                        {name}
                                    </p>
                                    <p className="text-xs font-thin italic text-gray-500 truncate">
                                        as {character}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                }
                <HandleComments movieId={movieId} />
            </div >
        </>
    )
}
export default MovieDetails;
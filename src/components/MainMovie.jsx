




import React, { useEffect } from 'react'
import Rating from './Rating'
import apiconnection from '../js/apiconnection'
import { useMovies } from '../hooks/useMovies'

export default function MainMovie({ movie }) {

    const watchedNowOnClick = async () => {
        const getVideos = await apiconnection.getMovieTrailer(movie.id)
        const trailerLink = getVideos.find(g => g.type === "Trailer")
        window.open(`https://www.youtube.com/watch?v=${trailerLink.key}`, "_blank");

    }


    return (
        <main className="main-container" id="main-container" style={
            {
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'


            }
        }>
            <h2 className="gender-label" id="gender">{ movie.genre[0]}</h2>
            <Rating rating={Math.round(movie.vote_average / 2)} />
            <h1 className="movie-title" id="movie-title">{movie.title}</h1>
            <p className="main-description-text" id="main-description-text">
                {movie.overview}
            </p>
            <button className="blue-button" id="watch-now-button" onClick={
                watchedNowOnClick
            }>
                Watch Now
            </button>
        </main>
    )
}

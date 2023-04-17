



import rectangle1 from '../images/rectangle.svg'
import rectangle2 from '../images/rectangle2.svg'
import React, { useEffect, useRef, useState } from 'react'
import Rating from './Rating'

export default function MostWatched({ movies, onMovieSelected }) {
    const [oneCard, setOneCard] = useState(false)
    const multiCardIcon = useRef(null);
    const oneCardIcon = useRef(null);
    const moviesCard = useRef(null);
    const movieContainer = useRef(null);
    function switchCard() {
        setOneCard(true);

    }


    function switchMultiCard() {

        setOneCard(false)

    }




    return (
        <section className="most-watched-movies-container" id="most-watched-movies-container" ref={movieContainer}>
            <h2 className="most-watched-title">
                Most Watched Movies
            </h2>
            <div className="switch-container">
                <div className={"multicard-switch" + (!oneCard && " switch-selected")} id="multi-card-switch" ref={multiCardIcon} onClick={switchMultiCard}>
                    <img src={rectangle1} className={"multicard-card-icon"} />
                    <img src={rectangle1} className={"multicard-card-icon"} />
                    <img src={rectangle1} className={"multicard-card-icon"} />
                </div>
                <img src={rectangle2} className={"one-card-icon" + (oneCard && " switch-selected")} id="one-card-switch" ref={oneCardIcon} onClick={switchCard} />
            </div>
            {movies.map((movie, index) =>

                <div className={'movie ' + (oneCard && 'movie-full-size')}


                    onClick={() => {
                        onMovieSelected(movie)
                    }}


                    style={
                        {
                            backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`
                        }
                    }>
                    <h3 className='most-watched-movie-title'>
                        {movie.title}
                    </h3>
                    <Rating rating={movie.vote_average / 2} />
                    <p className='most-watched-movie-description'>
                        {movie.overview}
                    </p>
                </div>

            )}


        </section>
    )
}

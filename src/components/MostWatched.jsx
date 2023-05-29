




import React, { useEffect, useRef, useState } from 'react'
import Rating from './Rating'
import CardsSwitch from './CardsSwitch';

export default function MostWatched({ movies, onMovieSelected }) {
    const [oneCard, setOneCard] = useState(false)
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
            <CardsSwitch oneCard={oneCard} switchCard={switchCard} switchMultiCard={switchMultiCard}></CardsSwitch>
            {movies.map((movie, index) =>
                <div key={index} className={'movie ' + (oneCard && 'movie-full-size')}

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

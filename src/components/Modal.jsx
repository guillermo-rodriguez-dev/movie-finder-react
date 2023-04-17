




import React from 'react'
import { useEffect } from 'react';
import apiconnection from '../js/apiconnection.js';
import forwardSlash from '../images/forwardSlash.svg'
import backwardsSlash from '../images/backwardsSlash.svg'
import '../css/modal.css'
export default function Modal({ movie, show, onModalClose }) {

    let trailerLink;
    let similarMovies;


    useEffect(() => {
        console.log("Cargando modal")
        const conectApi = async () => {
            const getVideos = await apiconnection.getMovieTrailer(movie.id)
            trailerLink = getVideos.find(g => g.type === "Trailer")

            similarMovies = await apiconnection.getSimilarMovies(movie.id);
        }
        show && conectApi();
        return () => {

        }
    }, [movie])


    const onPlayClick = () => {
        window.open(`https://www.youtube.com/watch?v=${trailerLink.key}`, "_blank");
    }
    return (
        show ?  <div className="modal-container overlay-modal" id="movie-details-modal">
            <main className="modal-content-container" id="movie-details-modal-container" style={
                { 'backgroundImage': `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }
            }>
                <div className="close-icon" id="close-button" onClick={onModalClose}>
                    <img className="more-movies-icon" src={forwardSlash} />
                    <img className="more-movies-icon" src={backwardsSlash} />

                </div>
                <button className="blue-button buttom-container" id="play-trailer-button" onClick={onPlayClick}>Play Trailer</button>
                <h1 className="movie-title" id="movie-details-title">{movie.title}</h1>
                <p className="description" id="modal-movie-description">
                    {movie.overview}
                </p>
            </main>
            <section className="meta-data-container">
                <div className="meta-data">
                    <p className="meta-data-title">Release Date</p>
                    <p className="meta-data-value" id="movie-release-date">{movie.release_date}</p>
                </div>
                <div className="meta-data">
                    <p className="meta-data-title">Original Language</p>
                    <p className="meta-data-value" id="movie-languaje">{movie.original_language}</p>
                </div>
                <div className="meta-data">
                    <p className="meta-data-title">Genre</p>
                    <p className="meta-data-value" id="movie-gender">Science Fiction</p>
                </div>


                <div className="meta-data">
                    <p className="meta-data-title">Popularity</p>
                    <p className="meta-data-value" id="movie-popularity">{"5/" + movie.vote_average / 2}</p>
                </div>
            </section>
            <footer className="footer" id="footer-movie-container">
                <h2 className="footer-title">Similar Movies:</h2>
            </footer>
        </div> : null
    )
}





import React, { useEffect, useState } from 'react'
import '../css/home.css'
import MainMovie from '../components/MainMovie'
import MostWatched from '../components/MostWatched'
import { useMovies } from '../hooks/useMovies'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
export default function Home() {

    const { mostWatchedMovie, mostWatchedMovies, logOut, searchMoviesByTitle, getNextPageOfMovies, loading } = useMovies({});
    const [showModal, setShowModal] = useState(false);
    const [movie, setMovie] = useState(null);

    const onMovieSelected = (movie) => {
        setMovie(movie);
        setShowModal(true);
    }

    const onModalClose = () => {
        setShowModal(false);
    }

    const onHandleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || loading) {
            console.log("OnHandleScroll");
            console.log(loading);
            console.log(window.innerHeight);
            console.log(document.documentElement.scrollTop)
            console.log(document.documentElement.offsetHeight)
            return;
        }
        console.log("OnHandleScroll loading");
        getNextPageOfMovies();
    }


    useEffect(() => {
        window.addEventListener('scroll', onHandleScroll);
        return () => window.removeEventListener('scroll', onHandleScroll);


    }, [loading])

    useEffect(() => {



    }, [mostWatchedMovies])



    return (
        <>

            {mostWatchedMovie && <Modal movie={movie} show={showModal} onModalClose={onModalClose} />}
            <div id="home-container">
                <Navbar logOut={logOut} onSearchMovie={searchMoviesByTitle} />
                {mostWatchedMovie && <MainMovie movie={mostWatchedMovie} />}
                {mostWatchedMovies && <MostWatched movies={mostWatchedMovies} onMovieSelected={onMovieSelected} />}
            </div></>
    )
}

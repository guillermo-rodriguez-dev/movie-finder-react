



import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import '../css/home.css'
import searchIcon from '../images/search-icon.svg'
import profilePic from '../images/profile.png'
import rectangle1 from '../images/rectangle.svg'
import rectangle2 from '../images/rectangle2.svg'
import { chargeHomePage } from '../js/home'
import MainMovie from '../components/MainMovie'
import MostWatched from '../components/MostWatched'
import { useMovies } from '../hooks/useMovies'
import apiconnection from '../js/apiconnection'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
export default function Home() {

    let oneCard = true;
    const { mostWatchedMovie, mostWatchedMovies, loading, logOut } = useMovies({});
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState(null)

    const onMovieSelected = (movie) => {
        console.log(movie)
        setMovie(movie)
        setShowModal(true)
    }

    const onModalClose = () => {
        setShowModal(false)
    }

    return (
        // <body className="body-container">
        <>
            {mostWatchedMovie && <Modal movie={movie} show={showModal} onModalClose={onModalClose} />}

            <div id="home-container">

                <Navbar logOut={logOut} />


                {mostWatchedMovie && <MainMovie movie={mostWatchedMovie} />}

                {mostWatchedMovies && <MostWatched movies={mostWatchedMovies} onMovieSelected={onMovieSelected} />}
            </div></>
        // </body>
    )
}

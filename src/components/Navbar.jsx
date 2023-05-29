





import React, { useRef, useState } from 'react'
import searchIcon from '../images/search-icon.svg'
import profilePic from '../images/profile.png'
import { useAuth } from '../hooks/useAuth';
import apiconnection from '../js/apiconnection';
import '../css/home.css'

//this class contains the home page navbar
export default function Navbar({ logOut, onSearchMovie }) {


    const [movies, setMovies] = useState(null)

    const auth = useAuth();
    const onEnter = (e) => {
        if (e.keyCode === 13) {
            onSearchMovie(e.target.value)
        }
    }
    const onClickSearch = (e) => {
        onSearchMovie(e.target.value)
    }


    const onSearchInputChange = async (e) => {
        if (e.target.value.length > 3) {
            const movies = await apiconnection.searchMovieByTitle(e.target.value);
            setMovies(movies.slice(0, 5))
        }

    }

    const onSearchFocusOut = (e) => {

        setMovies(null);
    }

    const onSearchFocusIn = async (e) => {
        if (e.target.value.length > 3) {
            const movies = await apiconnection.searchMovieByTitle(e.target.value);
            setMovies(movies.slice(0, 5))
        }
    }



    return (
        <header className="navbar">
            <p className="app-name"><strong>MOVIE</strong><i>finder</i></p>
            <div className="searchbar-container">
                <img className="searchbar-icon" src={searchIcon} alt="search icon" id="searchbar-icon" onClick={onClickSearch} />
                <input className="searchbar-input" type="search" placeholder="Search for a movie" id="searchbar-input" onKeyDown={onEnter} onFocus={onSearchFocusIn} onChange={onSearchInputChange} onBlur={onSearchFocusOut} />
                <ul className="search-resulta-container" id="search-result" >
                    {
                        movies && movies.map((movie) => {
                            return (
                                <li className="search-result" key={movie.id}>
                                    <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt="movie poster" />
                                    {movie.title}
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
            <button className="log-out-buttom" id="log-out-buttom" onClick={auth.logOut}>Log Out</button>
            <img src={profilePic} alt="profile image" className="profile-image" />
        </header>
    )
}

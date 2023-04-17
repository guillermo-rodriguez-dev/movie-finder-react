





import React, { useRef } from 'react'
import searchIcon from '../images/search-icon.svg'
import profilePic from '../images/profile.png'
import { useAuth } from '../hooks/useAuth';

export default function Navbar({logOut}) {

    const auth = useAuth();

    return (
        <header className="navbar">
            <p className="app-name"><strong>MOVIE</strong><i>finder</i></p>
            <div className="searchbar-container">
                <img className="searchbar-icon" src={searchIcon} alt="search icon" id="searchbar-icon" />
                <input className="searchbar-input" type="search" placeholder="Search for a movie" id="searchbar-input" />
                <ul className="search-resulta-container" id="search-result" />
            </div>
            <button className="log-out-buttom" id="log-out-buttom"  onClick={auth.logOut}>Log Out</button>
            <img src={profilePic} alt="profile image" className="profile-image" />
        </header>
    )
}

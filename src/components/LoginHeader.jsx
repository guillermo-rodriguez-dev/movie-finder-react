



import React from 'react'

export default function LoginHeader({logout}) {
    return (
        <header class="header" id="header-login">
            <title>Login Page for Movie Finder: The best web app to find your favorite movies!</title>
            <div class="header__text" id="title-container">
                <h1 class="title-login" id="login-title"><strong>MOVIE</strong><span
                    class="title-login-italic"><i>finder</i></span></h1>
            </div>
        </header>
    )
}

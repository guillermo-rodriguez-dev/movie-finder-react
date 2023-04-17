import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import '../css/login.css'
import eye from '../images/eye.png'
import facebookIcon from '../images/facebook-icon.png'
import twitterIcon from '../images/twitter-icon.png'
import googleIcon from '../images/google-icon.png'
import login from '../js/login'
import { useAuth } from '../hooks/useAuth'
export default function Login() {

    const hideRevelPassword = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const loginForm = useRef(null);
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false)
    const handleRevelPassword = useCallback(() => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    }, [])

    useEffect(() => {
        hideRevelPassword.current.addEventListener("click", handleRevelPassword
        );
        loginForm.current.addEventListener("submit", function async(event) {
            event.preventDefault();
            console.log("login button clicked");
            auth.signIn(emailInput.current.value, passwordInput.current.value);

        })

    }, [])


    return (
        <div className="main-container-login" id="login-body">
            <Header />
            <div className="login-card">
                <h2 className="login-card__title">Welcome! Log in or Register</h2>
                <h3 className="login-card__subtitle">Log in to find the movies you're looking for!</h3>
                <form className="login-form" id="loginForm" ref={loginForm}>
                    <input type="email" className={`text-input ${auth.emailError && 'input-error-state'}`} name="email" id="login-email-input" placeholder="Email" ref={emailInput} />
                    <div className="error-message" id="error-message-email" >
                        {auth.emailError}
                    </div>
                    <div className="password-container" id="password-container">
                        <input type={showPassword ? "text" : "password"} className={`password-input ${auth.passwordError && 'input-error-state'}`} name="password" id="login-password-input" ref={passwordInput}
                            placeholder="Password" />
                        <img src={eye} id="hide-revel-password" ref={hideRevelPassword} />
                    </div>
                    <div className="error-message" id="error-message-password">
                        {auth.passwordError}
                    </div>
                    <div className="checkbox-container">
                        <input type="checkbox" name="remember" className="remember-me-checkbox" id="rememberMe" /> <label
                            className="remember-me-checkbox__label" for="remember-me-checkbox">Remember me</label>
                        <a id="forgot-password-link">Forgot Password?</a>
                    </div>
                    <div className="error-message" id="error-message-general">
                        {auth.loginError}
                    </div>
                    <input value="Log in" type="submit" id="submit-login-buttom" className="submit-buttom" />
                </form>
                <div id="loader" className="loader-space"></div>
                <div className="not-registered-container">
                    <p>Not registered yet? <a href="./signUp.html">Register now</a></p>
                </div>
                <p className="line-with-text">or
                </p>
                <button className="login-external" id="login-facebook-button"><img src={facebookIcon}></img>Login
                    with
                    Facebook</button>
                <button className="login-external" id="login-twitter-button"><img src={twitterIcon}></img>Login with
                    Twitter</button>
                <button className="login-external" id="login-google-button">
                    <img src={googleIcon}></img>Login with Google
                </button>
            </div>

        </div>

    )
}

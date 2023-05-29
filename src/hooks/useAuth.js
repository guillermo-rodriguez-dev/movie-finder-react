import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';






//this hook contains the authentication methods and variabless
export const useAuth = (initialState = {}) => {

    const [user, setUser] = useState(initialState)
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const emailRegex = /.*@.*[.].*/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const navigate = useNavigate();

    useEffect(() => {

        const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
        console.log("accessToken:");
        console.log(accessToken);
        if (accessToken) {
            setUser({ "accesToken": accessToken });
            navigate('/home');
        }

    }, [])

    const logOut = () => {
        document.cookie = ``;
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        setUser(null);
        navigate("/");
    };

    const signIn = async (email, password) => {
        let valid = true;
        if (email === "") {
            setEmailError("Please enter your email");
            valid = false;
        }
        else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email");
            valid = false;
        } else {
            setEmailError("");
        }
        if (password === "") {
            setPasswordError("Please enter your password");

            valid = false;
        }
        else if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 8 characters and contain one letter and one number");
            valid = false;
        }
        else {
            setPasswordError("");
        }
        if (valid) {
            fetch("http://localhost:3000/login", {
                method: "post",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(response => {

                if (response.status === 200) {
                    setUser({ "accesToken": response.accesToken });

                    if (rememberMe.checked) {

                        localStorage.setItem("accessToken", response.accesToken);
                    } else {
                        sessionStorage.setItem("accessToken", response.accesToken);
                    }
                    navigate('/home');
                    // window.location.href = "home.html";
                }
                else if (response.status === 400) {
                    setLoginError("Invalid email or password");
                }
                else if (response.status === 404) {
                    setLoginError("Error Connecting with Server");
                }
            }
            ).catch(error => {
                // eslint-disable-next-line no-unused-expressions
                setLoginError("Error Connecting with Server")
            })
        } else {
            return false;
        };
    };

    return {
        user,
        logOut,
        signIn,
        emailError,
        passwordError,
        rememberMe,
        loginError
    }
}
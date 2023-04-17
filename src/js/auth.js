

const emailRegex = /.*@.*[.].*/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailInputContainer = document.getElementById("login-email-input");
const passwordInputContainer = document.getElementById("password-container");
const submitButton = document.getElementById("submit-login-buttom");
const loader = document.getElementById("loader");
const auth = {
    logOut: () => {
        document.cookie = ``;
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        window.location.href = "login.html";
    },

    //function to login user
    signIn: async () => {
        loader.classList.add("loader");
        let loginForm = document.getElementById("loginForm");
        let email = loginForm.email.value;
        let password = loginForm.password.value;
        let loginError = document.getElementById("error-message-general");
        let emailError = document.getElementById("error-message-email");
        let passwordError = document.getElementById("error-message-general");
        let rememberMe = document.getElementById("rememberMe");
        let valid = true;
        if (email === "") {
            emailError.innerHTML = "Please enter your email";
            emailInputContainer.classList.add("input-error-state");
            valid = false;
        }
        else if (!emailRegex.test(email)) {
            emailInputContainer.classList.add("input-error-state");
            emailError.innerHTML = "Please enter a valid email";
            valid = false;
        } else {
            emailInputContainer.classList.remove("input-error-state");
            emailError.innerHTML = "";
        }
        if (password == "") {
            passwordInputContainer.classList.add("input-error-state");
            passwordError.innerHTML = "Please enter your password";

            valid = false;
        }
        else if (!passwordRegex.test(password)) {
            passwordInputContainer.classList.add("input-error-state");
            passwordError.innerHTML = "Password must be at least 8 characters and contain one letter and one number";
            valid = false;
        }
        else {
            passwordInputContainer.classList.remove("input-error-state");
            passwordError.innerHTML = "";
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

                if (response.status == 200) {

                    if (rememberMe.checked) {
                        localStorage.setItem("accessToken", response.accesToken);
                    } else {
                        sessionStorage.setItem("accessToken", response.accesToken);
                    }
                    window.location.href = "home.html";
                }
                else if (response.status == 400) {
                    loginError.innerHTML = "Invalid email or password";
                }
            }
            ).catch(error => {
                // eslint-disable-next-line no-unused-expressions
                console.log("Error " + error), loginError.innerHTML = "Error Connecting with Server"
            })
            loader.classList.remove("loader");
        } else {
            loader.classList.remove("loader");
            return false;
        };
    },

    


    signUp: async () => {

        let signUpForm = document.getElementById("signUpForm");
        let email = signUpForm.email.value;
        let password = signUpForm.password.value;
        let loginError = document.getElementById("error-message-general");
        let emailError = document.getElementById("error-message-email");
        let passwordError = document.getElementById("error-message-general");

        if (email == "") {
            emailError.innerHTML = "Please enter your email";
            emailInputContainer.classList.add("input-error-state");
            return false;
        }
        else if (!emailRegex.test(email)) {
            emailInputContainer.classList.add("input-error-state");
            emailError.innerHTML = "Please enter a valid email";
            return false;
        } else {
            emailInputContainer.classList.remove("input-error-state");
            emailError.innerHTML = "";
        }
        if (password == "") {
            passwordInputContainer.classList.add("input-error-state");
            passwordError.innerHTML = "Please enter your password";

            return false;
        }
        else if (!passwordRegex.test(password)) {
            passwordInputContainer.classList.add("input-error-state");
            passwordError.innerHTML = "Password must be at least 8 characters and contain one letter and one number";
            return false;
        }
        else {
            passwordInputContainer.classList.remove("input-error-state");
            passwordError.innerHTML = "";
        }

        fetch("http://localhost:3000/signup", {
            method: "post",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => {
            if (response.status == 201) {
                loginError.innerHTML = ""
                document.cookie = `accesToken=${response.accesToken}`;
                window.location.href = "home.html";
            }
            else if (response.status == 400) {
                loginError.innerHTML = "Email already exists";
            }
        }
        ).catch(error => { console.log("Error " + error) }, loginError.innerHTML = "Error Connecting with Server");

    }


}

export default auth;
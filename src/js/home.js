import apiConnection from "./apiconnection.js";
import modal from "./modal.js";
import auth from "./auth.js";

const multiCardIcon = document.getElementById("multi-card-switch");

const oneCardIcon = document.getElementById("one-card-switch");

// const moviesCard = document.getElementsByClassName("movie");

const movieContainer = document.getElementById("most-watched-movies-container");

const logOutIcon = document.getElementById("log-out-buttom");

//this value is the number of pages already loaded
let mostWatchedMoviesPage = 1;

//this value is the maximum number of pages that exist in moviesapi
let totalPages;

//this save switch state
let oneCard = false;



//this function is clled when the page is loaded to recover the main movie data
const fillMainMovie = async (movie) => {
    this.mainContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;
    this.genderLabel.innerHTML = movie.title;
    this.mainDescription.innerHTML = movie.overview;
    this.movieTitle.textContent = movie.title;
    const getVideos = await apiConnection.getMovieTrailer(movie.id)
    const trailerLink = getVideos.find(g => g.type === "Trailer")
    this.watchButton.addEventListener("click", () => {
        // globalThis.window.open(`https://www.youtube.com/watch?v=${trailerLink.key}`, "_blank");
    });
    const ratingStars = Math.round(movie.vote_average / 2);
    this.ratingContainer.innerHTML = ""
    for (let start = 0; start < ratingStars; start++) {
        const star = document.createElement("i");
        star.classList.add("fas", "fa-star");
        this.ratingContainer.appendChild(star);
    }

}


//this function recovers and fills the movies list
const addMostWatchedMovies = (movies) => {
    for (let index = 1; index < movies.length; index++) {
        setTimeout(() => {
            const movie = document.createElement("div");
            movie.classList.add("loader");
            setTimeout(() => {
                movie.classList.remove("loader");
                movie.classList.add("movie");
                movie.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${movies[index].poster_path})`;
                const movieModalTitle = document.createElement("h3");
                movieModalTitle.classList.add("most-watched-movie-title");
                if (oneCard) {
                    movie.classList.add("movie-full-size");
                }
                movieModalTitle.textContent = movies[index].title;
                movie.appendChild(movieModalTitle);
                const ratingContainer = document.createElement("div");
                ratingContainer.classList.add("rating-container");
                const ratingStars = Math.round(movies[index].vote_average / 2);
                for (let start = 0; start < ratingStars; start++) {
                    const ratingStar = document.createElement("i");
                    ratingStar.classList.add("fa", "fa-star", "rating-start--small");
                    ratingContainer.appendChild(ratingStar);
                }
                movie.appendChild(ratingContainer);
                const movieDescription = document.createElement("p");
                movieDescription.classList.add("most-watched-movie-description");
                movieDescription.textContent = movies[index].overview;
                movie.appendChild(movieDescription);
            }, 150 * index)

            movie.addEventListener("click", async () => {
                modal.fillModal(movies[index]);
            });
            movieContainer.appendChild(movie)
        }, 100 * index);

    }
}

//this function charges the initial data for the home page
const chargeHomePage = async (mainContainer, genderLabel, mainDescription, movieTitle, ratingContainer, watchButton) => {
    const movies = await apiConnection.getMoviesFromApi();
    console.log(totalPages)
     totalPages = movies.total_pages;
    // const mostWatchedMovie = movies.results[0];
    // fillMainMovie(mostWatchedMovie);
    // addMostWatchedMovies(movies.results);
}

//this function is clled when the user searchs for movies
const chargeSearchResult = async (movies) => {
    const mostWatchedMovie = movies[0];
    fillMainMovie(mostWatchedMovie);
    movieContainer.innerHTML = ""; // removes the old results
    addMostWatchedMovies(movies);
}


//this function is clled when the user scroll to the end of the list of movies to load more movies
// document.addEventListener("scroll", () => {
//     if (globalThis.window.scrollY + globalThis.window.innerHeight >=
//         document.documentElement.scrollHeight && mostWatchedMoviesPage < totalPages) {
//         mostWatchedMoviesPage++;
//         apiConnection.getMoviesFromApi(mostWatchedMoviesPage).then((movies) => {
//             totalPages = movies.total_pages;
//             addMostWatchedMovies(movies.results);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }
// })
// logOutIcon.addEventListener("click", () => {
//     auth.logOut();
// });







export { chargeSearchResult, chargeHomePage };
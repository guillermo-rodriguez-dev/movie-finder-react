import apiConnection from "./apiconnection.js";

const movieDetailsModal = document.getElementById("movie-details-modal");
const closeMovieDetailsModal = document.getElementById("close-button");
const home = document.getElementById("home-container");
const modalMainContainer = document.getElementById("movie-details-modal-container");
const modalMovieModalTitle = document.getElementById("movie-details-title");
const moviePopularity = document.getElementById("movie-popularity");
const similarMoviesContainer = document.getElementById("footer-movie-container");
const movieDetailsDescription = document.getElementById("modal-movie-description");
const movieReleaseDate = document.getElementById("movie-release-date");
const movieLanguaje = document.getElementById("movie-languaje");
const movieGender = document.getElementById("movie-gender"); 
const playTrailerButton = document.getElementById("play-trailer-button");

//date to string options
const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
//this function is called when the user clicks a movie from the list to fill the modal window
const fillModal = async (movie) => {
    movieDetailsModal.classList.add('overlay-modal');
    movieDetailsModal.classList.remove('hidden-modal');
    home.classList.add('blur');
    closeMovieDetailsModal.addEventListener("click", () => {
        movieDetailsModal.classList.remove('overlay-modal');
        movieDetailsModal.classList.add('hidden-modal');
        home.classList.remove('blur');
    });
    modalMainContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;
    modalMovieModalTitle.textContent = movie.title;
    movieDetailsDescription.textContent = movie.overview;
    movieReleaseDate.textContent = new Date(movie.release_date).toLocaleDateString("en-US", options);
    movieLanguaje.textContent = movie.original_language;
    const genres = await apiConnection.getMovieGenre(movie.id)
    movieGender.textContent = genres.genres.filter(g => movie.genre_ids.includes(g.id)).map(g => g.name + " ");
    moviePopularity.textContent = "5/" + movie.vote_average / 2;
    const getVideos = await apiConnection.getMovieTrailer(movie.id)
    const trailerLink = getVideos.find(g => g.type === "Trailer")

    playTrailerButton.addEventListener("click", () => {
        window.open(`https://www.youtube.com/watch?v=${trailerLink.key}`, "_blank");
    })
    const similarMovies = await apiConnection.getSimilarMovies(movie.id);
    similarMoviesContainer.innerHTML = "";
    for (let index = 0; index < 3; index++) {
        const similarMovie = document.createElement("img");
        similarMovie.classList.add("movie-image");
        similarMovie.src = `https://image.tmdb.org/t/p/h632${similarMovies[index].backdrop_path}`;

        similarMoviesContainer.appendChild(similarMovie);
    }
}



export default { fillModal };
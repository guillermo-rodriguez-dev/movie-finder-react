import constants from "./constants.js";

const getMoviesFromApi = async(page = 1) => {
    let data
    let response = await fetch(`${constants.apiBaseUrl}/movie/popular?api_key=${constants.apiKey}&language=en-US&page=${page}`);
    data = await response.json();
    return data;
}


const getSimilarMovies = async (movieId) => {
    let response = await fetch(`${constants.apiBaseUrl}/movie/${movieId}/similar?api_key=${constants.apiKey}&language=en-US&page=1`);
    let data = await response.json();
    let movies = data.results;
    return movies;
}

const getMovieGenre = async (movieId) => {
    let response = await fetch(`${constants.apiBaseUrl}/genre/movie/list?api_key=${constants.apiKey}&language=en-US`);
    let data = await response.json();
    return data;
}


const getMovieTrailer = async (movieId) => {
    let response = await fetch(`${constants.apiBaseUrl}/movie/${movieId}/videos?api_key=${constants.apiKey}&language=en-US&page=1`);
    let data = await response.json();
    let movies = data.results;
    return movies;
}

const searchMovieByTitle = async (title) => {
    const response = await fetch(`${constants.apiBaseUrl}/search/movie?api_key=${constants.apiKey}&language=en-US&query=${title}&page=1&include_adult=false`);
    const data = await response.json();
    const movies = data.results;
    return movies;
}

export default { getSimilarMovies, getMoviesFromApi, getMovieGenre, getMovieTrailer, searchMovieByTitle };
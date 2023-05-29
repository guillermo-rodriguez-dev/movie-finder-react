import apiconnection from "../js/apiconnection";
import constants from "../js/constants";
import { useEffect, useState } from 'react';


//this hook contains the movies state
export const useMovies = () => {
    const [mostWatchedMovie, setMostWatchedMovie] = useState(null);
    const [mostWatchedMovies, setMostWatchedMovies] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getInitialMovies()
    }, [ ])




    const getInitialMovies = async () => {
        setLoading(true);
        const movies = await apiconnection.getMoviesFromApi();
        const moviePromises = movies.results.map(m => getMovieGenre(m));
        const genres = await Promise.all(moviePromises);
        movies.results.forEach((m, i) => m.genre = genres[i]);
        setMostWatchedMovie(movies.results[0]);
        setMostWatchedMovies(movies.results);
        setLoading(false);
    }

    const getNextPageOfMovies = async () => {
        setLoading(true);
        setCurrentPage((prevState) => prevState + 1)
        const movies = await apiconnection.getMoviesFromApi(currentPage);
        const moviePromises = movies.results.map(m => getMovieGenre(m));
        const genres = await Promise.all(moviePromises);
        movies.results.forEach((m, i) => m.genre = genres[i]);
        setMostWatchedMovies(mostWatchedMovies.concat(movies.results));
        console.log(mostWatchedMovies);
        setLoading(false);
    }


    const searchMoviesByTitle = async (title) => {
        const movies = await apiconnection.searchMovieByTitle(title);
        setMostWatchedMovie(movies[0]);
        setMostWatchedMovies(movies);
    }

    const getMovieGenre = async (movie) => {
        const genres = await apiconnection.getMovieGenre(movie.id)
        return genres.genres.filter(g => movie.genre_ids.includes(g.id)).map(g => g.name + " ");
    }


    return {
        mostWatchedMovie, mostWatchedMovies, loading, totalPages, setCurrentPage, searchMoviesByTitle,
        getMovieGenre, getNextPageOfMovies, loading
    }


}
import apiconnection from "../js/apiconnection";
import constants from "../js/constants";
import { useEffect, useState } from 'react';

export const useMovies = () => {
    const [mostWatchedMovie, setMostWatchedMovie] = useState(null);
    const [mostWatchedMovies, setMostWatchedMovies] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getMovies()
    }, [currentPage])

    const getMovies = async (page = currentPage) => {
        setLoading(true);
        const movies = await apiconnection.getMoviesFromApi();
        // setTotalPages(movies['total_pages']);
        setMostWatchedMovie(movies.results[0]);
        setMostWatchedMovies(movies.results);
        setLoading(false);

    }

    return { mostWatchedMovie, mostWatchedMovies, loading, totalPages, setCurrentPage,  }


}
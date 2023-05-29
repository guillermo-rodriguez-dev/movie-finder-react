import constants from "../js/constants";




//this function contains api conections functionalities
export const useApi = ({}) => {
    const getMoviesFromApi = (page = 1) => {
        let data
        let response = fetch(`${constants.apiBaseUrl}/movie/popular?api_key=${constants.apiKey}&language=en-US&page=${page}`).then(response => {
            data = response.json()
        }).catch(err => { console.log(err) });
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
    return { getSimilarMovies, getMoviesFromApi, getMovieGenre, getMovieTrailer };

}


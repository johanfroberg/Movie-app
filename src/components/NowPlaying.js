import React from 'react';
import { useState, useEffect } from 'react';
import ListOfMovies from './ListOfMovies/ListOfMovies';

const TopRated = (props) => {
  const [movies, setMovies] = useState([]);

  const getMovieSearchRequest = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  };

  useEffect(() => {
    getMovieSearchRequest();
  }, []);

  return <ListOfMovies movies={movies} />;
};

export default TopRated;

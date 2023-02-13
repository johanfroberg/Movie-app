import React from 'react';
import { useState, useEffect } from 'react';
import ListOfMovies from '../../components/ListOfMovies/ListOfMovies';
import MoviesHeading from '../../components/Heading/Heading';
import { Genres } from '../../components/Genres/Genres';
import useGenres from '../../hooks/useGenre';

const Discover = (props) => {
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const fetchMoviesByGenres = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreforURL}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  };

  useEffect(() => {
    fetchMoviesByGenres();
  }, [genreforURL]);

  return (
    <div className='discover'>
      <MoviesHeading heading='Discover' />
      <Genres
        type='movie'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
      />
      <div className='row search'>
        <ListOfMovies movies={movies} />
      </div>
    </div>
  );
};

export default Discover;

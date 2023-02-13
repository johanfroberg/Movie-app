import ListOfMovies from '../../components/ListOfMovies/ListOfMovies';
import MoviesHeading from '../../components/Heading/Heading';
import TopRated from '../../components/TopRated';
import NowPlaying from '../../components/NowPlaying';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {
  //Enables scrolling vertical with mouse

  document.querySelectorAll('.scrollable').forEach((item, index) => {
    // here
    item.addEventListener('wheel', (evt) => {
      evt.preventDefault();
      item.scrollLeft += evt.deltaY / 3;
    });
  });

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieSearchRequest = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchValue}&include_adult=false`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  };

  useEffect(() => {
    getMovieSearchRequest(searchValue);
  }, [searchValue]);

  return (
    <div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      {searchValue === '' && (
        <div>
          <MoviesHeading heading='Top Rated' />
          <div className='row scrollable'>
            <TopRated />
          </div>
          <MoviesHeading heading='Now playing' />
          <div className='row scrollable'>
            <NowPlaying />
          </div>
        </div>
      )}
      {searchValue !== '' && (
        <div>
          <MoviesHeading heading='Search' />
          <div className='row search'>
            <ListOfMovies movies={movies} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

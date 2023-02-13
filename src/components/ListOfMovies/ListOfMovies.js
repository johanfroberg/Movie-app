import React from 'react';
import MovieInfo from '../MovieInfo/MovieInfo';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import './ListOfMovies.css';

const ListOfMovies = (props) => {
  return (
    <>
      {props.movies.map((movie) => (
        <MovieInfo id={movie.id}>
          <div className='poster-image d-flex justify-content-start m-3'>
            <img
              className='poster'
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            ></img>
            <div className='overlay'>
              <div className='title-text'>{movie.original_title}</div>
              <div className='release-text'>
                <InsertChartIcon /> {movie.vote_average} |{' '}
                {movie.release_date.slice(0, movie.release_date.indexOf('-'))}
              </div>
            </div>
            <div className='infobar d-flex align-items-center justify-content-center'></div>
          </div>
        </MovieInfo>
      ))}
    </>
  );
};

export default ListOfMovies;

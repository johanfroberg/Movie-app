import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Youtube from 'react-youtube';
import './MovieInfo.css';
import '../../App.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: '#1E1E1E',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 0,
};

export default function MovieInfo({ children, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [movie, setMovie] = useState([]);

  const getMovieData = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,credits`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setMovie(responseJson);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [movie]);

  const renderTrailer = () => {
    const trailer = movie.videos.results[0];
    return (
        <Youtube className="youtube"
          videoId={trailer?.key}
          opts={{
            width: "50%",
            height: "50%",
          }}
        />
    );
  };

  const renderGenres = () => {
    if (movie.genres) {
      return movie.genres.map((genre, i) =>
        i === movie.genres.length - 1 ? ` ${genre.name}` : ` ${genre.name},`
      );
    }
  };

  const renderActors = () => {
    if (movie.credits) {
      return movie.credits.cast
        .slice(0, 10)
        .map((actor, i) =>
          i === movie.credits.cast.length - 1 || i === 9
            ? ` ${actor.name}`
            : ` ${actor.name},`
        );
    }
  };

  return (
    <div className='row-width'>
      <Button
        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
        onClick={handleOpen}
      >
        {children}
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {movie && (
          <Fade in={open}>
            <Box sx={style}>
              <div
                className='backdrop-poster'
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
                }}
              >
                <div className='movie-info'>
                  {movie.videos ? renderTrailer() : null}
                  <div className='gradient'>
                    <div className='movie-title'>{movie.title}</div>
                    <div className='movie-overview'>
                      {movie.overview ? movie.overview : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className='extra-info'>
                <div>
                  Genres:
                  {movie.genres ? renderGenres() : null}
                </div>
                <div className="actors">Actors: {movie.credits ? renderActors() : null}</div>
                <div>Release date: {movie.release_date}</div>
                <div>TMDB rating: {movie.vote_average}</div>
              </div>
            </Box>
          </Fade>
        )}
      </Modal>
    </div>
  );
}

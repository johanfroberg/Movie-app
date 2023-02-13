import React from 'react';
import { useEffect } from 'react';
import './Genres.css';
import Chip from '@mui/material/Chip';

export const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
}) => {
    const addGenre = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
    }

    const removeGenre = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres, genre]);
    }

    const fetchGenres = async () => {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

        const response = await fetch(url);
        const responseJson = await response.json();


        if (responseJson.genres) {
            setGenres(responseJson.genres);
        }
    }


    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres({});
        };
    }, []);

    return (
        <div className="genres">
            {selectedGenres && selectedGenres.map && selectedGenres.map((genre) => (
                <Chip className="selected-genre-chip" label={genre.name} key={genre.id} clickable onDelete={() => removeGenre(genre)} />
            ))}
            {genres && genres.map && genres.map((genre) => (
                <Chip className="genre-chip" label={genre.name} key={genre.id} clickable onClick={() => addGenre(genre)} />
            ))}
        </div>
    );
};

import React from 'react';
import './Heading.css';

const MoviesHeading = (props) => {
  return (
    <div className='col heading'>
      <h1>{props.heading}</h1>
    </div>
  );
};

export default MoviesHeading;

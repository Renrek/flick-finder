/**** SYSTEM ****/
import React from 'react';

// Simple consistant image
const MovieImage = ({ title, tmdbPath}) => {

    return ( 
        <img 
          style={{height: 200}}
          alt={title}
          src={'https://image.tmdb.org/t/p/original/'+tmdbPath}
        />
    )
}

export default MovieImage;

import React from 'react'

import MovieImage from '../MovieImage/MovieImage';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
  Divider,
  Typography,
  Button,
  Box,
} from '@material-ui/core';


const useStyles = makeStyles({
    titleSelector: {
      width: '100%',
      marginTop: 30,
      marginBottom: 10,
    },
    titleButton: {
      display: 'block',
    }
    
  });

const FeedRecommendItem = ({ movie }) => {
    const classes = useStyles();
    return (
        <>
            <Typography
                className={classes.title}
                variant="h6"
                noWrap
                gutterBottom
                align="center"
                >
                {movie.title}
                </Typography>
            <Box display="flex" justifyContent="center" >
                <Box flexShrink={1} mr={2}>
                    <MovieImage title={movie.title} tmdbPath={movie.poster_path}/>
                </Box>
                <Box flexGrow={1}>
       
                </Box>
            </Box>
            <Divider />
       </>
    )
}

export default FeedRecommendItem

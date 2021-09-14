import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getHumanReadableTime from '../../utility/getHumanReadableTime';
import getMonthDDYYYY from '../../utility/getMonthDDYYYY';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
  Paper,
  Typography,
  Button,
  Box
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


const FeedNextViewing = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const movie = useSelector(store => store.nextViewing);

    React.useEffect(() => {
        dispatch({ type: 'FETCH_NEXT_VIEWING'});
    }, []);

    console.log('movie', movie);
    return (
        <>
        { Object.keys(movie).length > 0 && 
            <Paper >
            <Typography variant="h6" gutterBottom >Next Viewing on {getMonthDDYYYY(movie.viewingDate)}</Typography>
            <Typography variant="h6" gutterBottom>{getHumanReadableTime(movie.viewingDate)}</Typography>
              <Typography
                    className={classes.title}
                    variant="h6"
                    noWrap
                    gutterBottom
                    align="center"
                  >
                    {movie.movieDetails.original_title}
                  </Typography>
              <Box display="flex" justifyContent="center" >
                <Box flexShrink={1} mr={2}>
                  <img 
                    style={{height: 200}}
                    alt={movie.original_title}
                    src={'https://image.tmdb.org/t/p/original/'+movie.movieDetails.poster_path}
                  />
                </Box>
                <Box flexGrow={1}>
                  
                    <Typography align="center">Viewers: {movie.viewers.length}</Typography>
                    {movie.isHost && <Button color="primary" variant="contained">Edit</Button>}
                </Box>
              </Box>
            </Paper>
        
        }
        </>
    )
}

export default FeedNextViewing;

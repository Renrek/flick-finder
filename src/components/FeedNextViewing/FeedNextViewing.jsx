/**** SYSTEM ****/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

/**** SNIPPETS ****/
import getHumanReadableTime from '../../utility/getHumanReadableTime';
import getMonthDDYYYY from '../../utility/getMonthDDYYYY';

/**** COMPONENTS ****/
import MovieImage from '../MovieImage/MovieImage';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
  Paper,
  Typography,
  Button,
  Box
} from '@material-ui/core';

/**** ICONS ****/
import EditIcon from '@material-ui/icons/Edit'

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

  /**** HOOKS ****/
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  /**** STATE ****/
  const movie = useSelector(store => store.nextViewing);

  // Fetch the next viewing appointment
  React.useEffect(() => {
      dispatch({ type: 'FETCH_NEXT_VIEWING'});
  }, []);
  
  const handleEdit = () => {
    dispatch({
      type: 'FETCH_VIEWING_TO_EDIT',
      payload: { id: movie.id, history }
    });
  }

  return (
    <>
      { Object.keys(movie).length > 0 && 
        <Paper >
          <Typography 
            variant="h5"
            align="center"
            gutterBottom 
          >
            Next Viewing
          </Typography>
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
              <MovieImage 
                title={movie.original_title} 
                tmdbPath={movie.movieDetails.poster_path} 
              />
            </Box>
            <Box flexGrow={1}>
              <Typography 
                style={{ marginTop: 20}}
                align="center"
                variant="h6" 
                gutterBottom 
              >
                {getMonthDDYYYY(movie.viewingDate)}
              </Typography>
              <Typography 
                variant="h6" 
                align="center"
                gutterBottom
              >
                  {getHumanReadableTime(movie.viewingDate)}
              </Typography>
              <Typography 
                align="center"
                gutterBottom
              >
                Particiapants: {movie.viewers.length + 1}
              </Typography>
              {movie.isHost && 
                <Button
                  color="primary"
                  style={{width: '100%', marginTop: 20}}
                  variant="contained" 
                  onClick={handleEdit}
                >
                  <EditIcon />
                </Button>
              }
            </Box>
          </Box>
        </Paper>
      }
    </>
  )
}

export default FeedNextViewing;

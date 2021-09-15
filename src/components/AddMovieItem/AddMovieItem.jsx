import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
  Paper,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box
} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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

import AddIcon from '@material-ui/icons/Add';
import MovieImage from '../MovieImage/MovieImage';

const AddMovieItem = ({movie}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // Anticipation from options from database.
    const anticipationOptions = useSelector(store => store.anticipationOptions);

    // Local state for select input
    const [anticiapation, setAnticipation] = React.useState('');
    const [isSelected, setIsSelected] = React.useState(false)
    //Save movie to database.
    const handleSumbit = (event) => {
        event.preventDefault();
        setIsSelected(true);
        dispatch({
            type: 'SAVE_MOVIE',
            payload: { movieId: movie.id, anticipationId: anticiapation }
        });
      };

    return (
        <Paper >
          <Typography
                className={classes.title}
                variant="h6"
                noWrap
                gutterBottom
                align="center"
              >
                {movie.original_title}
              </Typography>
          <Box display="flex" justifyContent="center" >
            <Box flexShrink={1} mr={2}>
              <MovieImage 
                title={movie.original_title} 
                tmdbPath={movie.poster_path} 
              />
            </Box>
            <Box flexGrow={1}>
              
                <form
                    noValidate
                    autoComplete="off" 
                    onSubmit={handleSumbit}
                >
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.titleSelector}
                    disabled={isSelected}
                  >
                    <InputLabel>anticipation</InputLabel>
                    <Select
                      name="anticipation_id"
                      onChange={event => setAnticipation(event.target.value)}
                      value={anticiapation}
                      label="Anticipation"
                    >
                    {anticipationOptions.map((option)=>(
                      <MenuItem
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                    </Select>
                    <Button 
                      className={classes.titleSelector}
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      disabled={isSelected}
                    >
                      { isSelected ? <CheckCircleIcon /> :  <AddIcon /> }
                    </Button>
                  </FormControl>
                </form>
            </Box>
          </Box>
        </Paper>
    )
}

export default AddMovieItem;

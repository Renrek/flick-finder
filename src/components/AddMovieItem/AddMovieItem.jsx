/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** COMPONENTS ****/
import MovieImage from '../MovieImage/MovieImage';

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

/**** ICONS ****/
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddIcon from '@material-ui/icons/Add';

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


// Child componant of AddMovie handles the information of each movie
const AddMovieItem = ({movie}) => {

    /**** HOOKS ****/
    const classes = useStyles();
    const dispatch = useDispatch();

    /**** STATE ****/
    const anticipationOptions = useSelector(store => store.anticipationOptions);
    const [anticiapation, setAnticipation] = React.useState('');
    const [isSelected, setIsSelected] = React.useState(false);

    //Save movie to database.
    const handleSubmit = () => {
        
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
                title={movie.title} 
                tmdbPath={movie.poster_path} 
              />
            </Box>
            <Box flexGrow={1}>
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
                  variant="contained" 
                  color="primary" 
                  disabled={isSelected}
                  onClick={handleSubmit}
                >
                  { isSelected ? <CheckCircleIcon /> :  <AddIcon /> }
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Paper>
    )
}

export default AddMovieItem;

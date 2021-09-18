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
import DeleteIcon from '@material-ui/icons/Delete';

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

const MyMoviesItem = ({movie}) => {

  /**** HOOKS ****/
  const dispatch = useDispatch();
  const classes = useStyles();

  /**** STATE ****/
  const anticipationOptions = useSelector(store => store.anticipationOptions);
  const [anticiapation, setAnticipation] = React.useState(movie.anticipationId);
  
  // Save newly selected anticipation
  const handleChange = (value) => {
      setAnticipation(value);
      dispatch({
          type: 'SAVE_ANTICIPATION',
          payload: { id: movie.id, anticipationId: value }
      })
  }

  // Remove unwanted movie
  const handleDelete = () => {
    const deleteMessage = `Deleting ${movie.title} from your list`;
    if(confirm(deleteMessage)){
      dispatch({
        type: 'DELETE_MOVIE',
        payload: movie.id
      })
    }
  }

  return (
    <Paper>
      <Typography
        className={classes.title}
        variant="h6"
        noWrap
        gutterBottom
        align="center"
      >
        {movie.data.title}
      </Typography>
      <Box display="flex" justifyContent="center" >
        <Box flexShrink={1} mr={2}>
          <MovieImage 
            title={movie.data.title} 
            tmdbPath={movie.data.poster_path}
          />
        </Box>
        <Box flexGrow={1}>
          <FormControl
            required
            variant="outlined"
            className={classes.titleSelector}
          >
            <InputLabel>Anticipation</InputLabel>
            <Select
              name="anticipation_id"
              onChange={event => handleChange(event.target.value)}
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
          </FormControl>
          <Button 
            className={classes.titleSelector}
            variant="contained" 
            color="secondary" 
            onClick={handleDelete}
          >
              <DeleteIcon />
          </Button>
        </Box>
      </Box>   
    </Paper>
  )
}

export default MyMoviesItem;

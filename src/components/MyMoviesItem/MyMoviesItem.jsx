/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** COMPONENTS ****/
import MovieImage from '../MovieImage/MovieImage';

/**** MATERIAL UI ****/
import { 
  Paper,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';

/**** ICONS ****/
import DeleteIcon from '@material-ui/icons/Delete';


const MyMoviesItem = ({movie}) => {

  /**** HOOKS ****/
  const dispatch = useDispatch();

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
    dispatch({
      type: 'DELETE_MOVIE',
      payload: movie.id
    })
  }

  return (
    <Paper>
        <Typography>{movie.data.title}</Typography>
        <MovieImage title={movie.data.title} tmdbPath={movie.data.poster_path}/>
          <FormControl
            required
            variant="outlined"
          >
            <InputLabel>anticipation</InputLabel>
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
          <Button variant="contained" color="secondary" onClick={handleDelete}><DeleteIcon /></Button>
    </Paper>
  )
}

export default MyMoviesItem;

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
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

const MyMoviesItem = ({movie}) => {

    const dispatch = useDispatch();
    const anticipationOptions = useSelector(store => store.anticipationOptions);
    const [anticiapation, setAnticipation] = React.useState(movie.anticipationId);
    
    const handleChange = (value) => {
        setAnticipation(value);
        dispatch({
            type: 'SAVE_ANTICIPATION',
            payload: { id: movie.id, anticipationId: value }
        })
    }

    const handleDelete = () => {
      dispatch({
        type: 'DELETE_MOVIE',
        payload: movie.id
      })
    }
    return (
        <Paper>
            <Typography>{movie.data.title}</Typography>
            <img style={{height: 200}}src={'https://image.tmdb.org/t/p/original/'+movie.data.poster_path}/>
            
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

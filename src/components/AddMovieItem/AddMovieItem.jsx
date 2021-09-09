import React from 'react';
import { useSelector } from 'react-redux';

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



import AddIcon from '@material-ui/icons/Add';

const AddMovieItem = ({movie}) => {
    const anticipationOptions = useSelector(store => store.anticipationOptions)
    const [anticiapation, setAnticipation] = React.useState('');

    const handleAdd = (id) => {
        console.log('id',id);
        console.log("anticipation",anticiapation);
      };

    return (
        <Paper >
        <Typography>{movie.original_title}</Typography>
        <img style={{height: 200}}src={'https://image.tmdb.org/t/p/original/'+movie.poster_path}/>
        <form>
          <FormControl
            required
            variant="outlined"
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
                value={option.value}
              >
                {option.name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={()=> handleAdd(movie.id)}><AddIcon /></Button>
        </form>
        </Paper>
    )
}

export default AddMovieItem;

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

const useStyles = makeStyles({
  titleSelector: {
    width: '100%',
    verticalAlign: 'middle',
  },
  
});

import AddIcon from '@material-ui/icons/Add';

const AddMovieItem = ({movie}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // Anticipation from options from database.
    const anticipationOptions = useSelector(store => store.anticipationOptions);

    // Local state for select input
    const [anticiapation, setAnticipation] = React.useState('');

    //Save movie to database.
    const handleSumbit = (event) => {
        event.preventDefault();
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
              <img 
                style={{height: 200}}
                alt={movie.original_title}
                src={'https://image.tmdb.org/t/p/original/'+movie.poster_path}
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
                    <Button type="submit" variant="contained" color="primary" ><AddIcon /></Button>
                  </FormControl>
                </form>
            </Box>
          </Box>
        </Paper>
    )
}

export default AddMovieItem;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddMovieItem from '../AddMovieItem/AddMovieItem'

/**** MATERIAL UI ****/
import { 
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

;


function AddMoviePage() {

  const dispatch = useDispatch();
  const [searchField, setSearchField] = React.useState('');
  
  const movieSearchResults = useSelector(store => store.movieSearch);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
        type: 'FETCH_MOVIE_SEARCH',
        payload: searchField
    })
    setSearchField('')
  };

  const handleAdd = (id) => {
    console.log('id',id);
    console.log("anticipation",anticiapation);
  };

  return (
    <>
      <Paper>
        <Typography>Search</Typography>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            required
            label="Search"
            variant="outlined"
            value={searchField}
            onChange={(event)=> setSearchField(event.target.value)}
          />
          <Button type="submit" variant="contained" color="primary"><SearchIcon /></Button>
        </form>
      </Paper>
      {movieSearchResults.map((movie)=> (
        <AddMovieItem key={movie.id} movie={movie}/>
      ))}
    </>
  );
}

export default AddMoviePage;

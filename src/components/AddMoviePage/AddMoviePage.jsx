import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import AddIcon from '@material-ui/icons/Add';


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
    console.log(id);
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
        <Paper key={movie.id}><Typography>{movie.original_title}</Typography><img style={{height: 200}}src={'https://image.tmdb.org/t/p/original/'+movie.poster_path}/>
        <Button variant="contained" color="primary" onClick={()=> handleAdd(movie.id)}><AddIcon /></Button>
        </Paper>
      ))}
    </>
  );
}

export default AddMoviePage;

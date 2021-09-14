import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddMovieItem from '../AddMovieItem/AddMovieItem'

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  searchButton: {
    float: 'right', 
    height: 52
  },
  searchField: {
    width: '75%',
  }
});

function AddMoviePage() {

  const classes = useStyles();
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
        <Typography
          variant="h5"
        >
          Search By Title
        </Typography>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{alignItems: 'center'}}
        >
          <TextField
            required
            className={classes.searchField}
            label="Search"
            variant="outlined"
            value={searchField}
            onChange={(event)=> setSearchField(event.target.value)}
          />
          <Button 
            className={classes.searchButton}
            type="submit" 
            variant="contained" 
            color="primary"
          >
              <SearchIcon />
          </Button>
        </form>
      </Paper>
      {movieSearchResults.map((movie)=> (
        <AddMovieItem key={movie.id} movie={movie}/>
      ))}
    </>
  );
}

export default AddMoviePage;

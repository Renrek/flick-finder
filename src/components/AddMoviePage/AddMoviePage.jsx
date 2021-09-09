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


function AddMoviePage() {
  const dispatch = useDispatch();
  const [searchField, setSearchField] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
        type: 'FETCH_MOVIE_SEARCH',
        payload: searchField
    })
    setSearchField('')
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
    </>
  );
}

export default AddMoviePage;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyMoviesItem from '../MyMoviesItem/MyMoviesItem';

/**** MATERIAL UI ****/
import { 
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const MyMoviesPage = () => {

    const dispatch = useDispatch();
    const movieList = useSelector(store => store.movieList);
    const [searchField, setSearchField] = React.useState('');

    React.useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_LIST'})
    }, []);

    const handleSubmit =  () => {

    }

    return (
        <>
        {movieList.map((movie) => (
            <MyMoviesItem key={movie.id} movie={movie} />
        ))}
            {/* <Paper>
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
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                    >
                        <SearchIcon />
                    </Button>
                </form>
            </Paper> */}
            
        </>
    )
}

export default MyMoviesPage;

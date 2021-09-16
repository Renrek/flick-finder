/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** COMPONENTS ****/
import MyMoviesItem from '../MyMoviesItem/MyMoviesItem';


const MyMoviesPage = () => {

    /**** HOOKS ****/
    const dispatch = useDispatch();
    
    /**** STATE ****/
    const movieList = useSelector(store => store.movieList);

    // Fetch movie list from database & tmdb api
    React.useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_LIST'});
    }, []);

    return (
        <>
        {movieList.map((movie) => (
            <MyMoviesItem key={movie.id} movie={movie} />
        ))}
        </>
    )
}

export default MyMoviesPage;

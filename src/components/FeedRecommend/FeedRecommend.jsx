import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddMovieItem from '../AddMovieItem/AddMovieItem';

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

const FeedRecommend = () => {
    const dispatch = useDispatch();
    const recommended = useSelector(store => store.recommended);

    React.useEffect(() => {
        dispatch({ type: "FETCH_RECOMMENDED"})
    }, []);

    return (
        <>
        { Object.keys(recommended).length > 0 &&
            <>
            <Paper>
                <Typography 
                    variant="h5"
                    align="center"
                    gutterbottom
                >
                    Recommendations
                </Typography>
                <Typography
                    variant="subtitle2"
                    gutterbottom
                    align="center"
                >
                    Based on your top three preferred genres
                </Typography>
                {recommended.topThreeGenres.map( (genre, i) => (
                    <Typography
                        style={{marginTop: 20}}
                        variant="h6"
                        align="center"
                        key={i}
                    >
                        {genre}
                    </Typography>
                ))}
            </Paper>
            {recommended.data.map(movie => (
                <AddMovieItem key={movie.id} movie={movie} />
            ))}
            </>
        }
        </>
    )
}

export default FeedRecommend

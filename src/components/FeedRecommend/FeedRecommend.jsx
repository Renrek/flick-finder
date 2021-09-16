import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FeedRecommendItem from '../FeedRecommendItem/FeedRecommendItem';

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
            <Paper>
                {recommended.topThreeGenres.map( genre => (
                    <p>{genre}</p>
                ))}
                {recommended.data.map(movie => (
                    <FeedRecommendItem movie={movie} />
                ))}
            </Paper>
            
        }
        </>
    )
}

export default FeedRecommend

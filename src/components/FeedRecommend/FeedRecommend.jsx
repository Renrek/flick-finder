/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** COMPONENTS ****/
import FeedRecommendItem from '../FeedRecommendItem/FeedRecommendItem';

/**** MATERIAL UI ****/
import { 
  Paper,
} from '@material-ui/core';

const FeedRecommend = () => {

    /**** HOOKS ****/
    const dispatch = useDispatch();

    /**** STATE ****/
    const recommended = useSelector(store => store.recommended);

    // On load fetch recommended videos from server
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
                    // my need to do short circut evaluation here for key issue - noted in trello
                    <FeedRecommendItem key={movie.id} movie={movie} />
                ))}
            </Paper>
        }
        </>
    )
}

export default FeedRecommend

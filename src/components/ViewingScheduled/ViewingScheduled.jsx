import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getHumanReadableTime from '../../utility/getHumanReadableTime'; // Human readable time.
import getMonthDDYYY from '../../utility/getMonthDDYYYY';

import MovieImage from '../MovieImage/MovieImage';

/**** MATERIAL UI ****/
import { 
    Paper,
    Typography,
    TextField,
    Button
} from '@material-ui/core';


const ViewingScheduled = () => {
    const dispatch = useDispatch();

    const lastAddedViewing = useSelector(store => store.lastAddedViewing)
    const [dateTime, setDateTime] = React.useState('')
    console.log(lastAddedViewing);

    

    React.useEffect(() => {
       setDateTime({
           date: getMonthDDYYY(lastAddedViewing.viewingDate),
           time: getHumanReadableTime(lastAddedViewing.viewingDate)
       });
    }, [lastAddedViewing])

    return (
        <Paper>
            {lastAddedViewing.viewers ? <div>
                <Typography variant="h6">Just added {lastAddedViewing.movieDetails.original_title} </Typography>
            
            <MovieImage title={lastAddedViewing.movieDetails.original_title} tmdbPath={lastAddedViewing.movieDetails.poster_path} />
                <br/>
            <p>{dateTime.date}</p>
            <p>{dateTime.time}</p>
            {lastAddedViewing.viewers.map(viewerId => (
                    <div key={viewerId}>{viewerId}</div>
            ))}
       
         </div>
         : <p>.....LOADING</p>}
        </Paper>
    )
}

export default ViewingScheduled;

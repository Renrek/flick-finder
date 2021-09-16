/**** SYSTEM ****/
import React from 'react';
import { useSelector } from 'react-redux';

/**** SNIPPETS ****/
import getHumanReadableTime from '../../utility/getHumanReadableTime';
import getMonthDDYYY from '../../utility/getMonthDDYYYY';

/**** COMPONENTS ****/
import MovieImage from '../MovieImage/MovieImage';

/**** MATERIAL UI ****/
import { 
    Paper,
    Typography
} from '@material-ui/core';


const ViewingScheduled = () => {
    
    /**** STATE ****/
    const lastAddedViewing = useSelector(store => store.lastAddedViewing);
    const [dateTime, setDateTime] = React.useState('');

    // On lastAddedViewing state update, adjust time.
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

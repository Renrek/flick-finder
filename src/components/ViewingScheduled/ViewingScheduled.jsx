import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


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
    
    console.log(lastAddedViewing);
    

    return (
        <Paper>
            {lastAddedViewing.viewers ? <div>
                <Typography variant="h6">Just added</Typography>
            <img style={{height: 200}}src={'https://image.tmdb.org/t/p/original/'+lastAddedViewing.movieDetails.poster_path}/>
            
                <br/>
            <p>{lastAddedViewing.movieId}</p>
            <p>{lastAddedViewing.viewingDate}</p>
            {lastAddedViewing.viewers.map(viewerId => (
                    <div key={viewerId}>{viewerId}</div>
            ))}
       
         </div>
         : <p>.....LOADING</p>}
        </Paper>
    )
}

export default ViewingScheduled;

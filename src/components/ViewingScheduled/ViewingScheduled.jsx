/**** SYSTEM ****/
import React from 'react';
import { useSelector } from 'react-redux';

/**** SNIPPETS ****/
import getHumanReadableTime from '../../utility/getHumanReadableTime';
import getMonthDDYYY from '../../utility/getMonthDDYYYY';

/**** COMPONENTS ****/
import MovieImage from '../MovieImage/MovieImage';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
    Paper,
    Typography,
    Box
} from '@material-ui/core';

const useStyles = makeStyles({
    titleSelector: {
      width: '100%',
      marginTop: 30,
      marginBottom: 10,
    },
    titleButton: {
      display: 'block',
    }
    
  });
const ViewingScheduled = () => {
    /**** HOOKS ****/
  const classes = useStyles();
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
                <Typography 
            variant="h5"
            align="center"
            gutterBottom 
          >
            Viewing Added
          </Typography>
         
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            gutterBottom
            align="center"
          >
            {lastAddedViewing.movieDetails.original_title}
          </Typography>
          <Box display="flex" justifyContent="center" >
            <Box flexShrink={1} mr={2}>
            <MovieImage title={lastAddedViewing.movieDetails.original_title} tmdbPath={lastAddedViewing.movieDetails.poster_path} />
            </Box>
            <Box flexGrow={1}>
              <Typography 
                style={{ marginTop: 50}}
                align="center"
                variant="h6" 
                gutterBottom 
              >
                {dateTime.date}
              </Typography>
              <Typography 
                variant="h6" 
                align="center"
                gutterBottom
              >
                  {dateTime.time}
              </Typography>
              <Typography 
                align="center"
                gutterBottom
              >
                Participants: {lastAddedViewing.viewers.length + 1}
              </Typography>
              
            </Box>
          </Box>
            
            
               
       
         </div>
         : <p>.....LOADING</p>}
        </Paper>
    )
}

export default ViewingScheduled;

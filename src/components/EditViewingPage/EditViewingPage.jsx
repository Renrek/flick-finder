/**** SYSTEM ****/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

/**** SNIPPETS ****/
import formatDateForField from '../../utility/formatDateForField';

/**** COMPONENTS ****/
import MovieImage from '../MovieImage/MovieImage';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
    Paper,
    Typography,
    TextField,
    Button,
    Box
 } from '@material-ui/core';

/**** ICONS ****/
import SaveIcon from '@material-ui/icons/Save';

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
  
const EditViewingPage = () => {
  
    /**** HOOKS ****/
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();

    /**** STATE ****/
    const movie = useSelector(store => store.editViewing);
    const [dateTime, setDateTime] = React.useState(formatDateForField(movie.viewingDate))

    // On page load get viewing to edit by id supplied by url route (useParams)
    React.useEffect(() => {
        dispatch({
            type: 'FETCH_VIEWING_TO_EDIT',
            payload: id
        })
    }, []);

    // Update date of viewing
    const onSave = () => {
        dispatch({
            type: 'SAVE_VIEWING_DATE',
            payload: { id, date: dateTime }
        })
    }

    return (
        <>
        { Object.keys(movie).length > 0 ?
            <Paper >
              <Typography
                    className={classes.title}
                    variant="h6"
                    noWrap
                    gutterBottom
                    align="center"
                  >
                    {movie.movieDetails.original_title}
                  </Typography>
              <Box display="flex" justifyContent="center" >
                <Box flexShrink={1} mr={2}>
                  <MovieImage title={movie.original_title} tmdbPath={movie.movieDetails.poster_path} />
                </Box>
                <Box flexGrow={1}>
                    <TextField
                            label="Edit Viewing Date"
                            type="datetime-local"
                            defaultValue={dateTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => setDateTime(event.target.value)}
                        />
                    <Button color="primary" variant="contained" onClick={onSave}><SaveIcon /></Button>
                </Box>
              </Box>
              {movie.viewers.map((contact) => (
                <Typography></Typography>
            ))} 
            </Paper>
           
            :
            <Paper>Loading..</Paper>
        }
        </>
    )
}

export default EditViewingPage;

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
  saveButton: {
    float: 'right', 
    height: 52
  },
  timeDateField: {
    width: '75%',
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
                variant="h6"
                noWrap
                gutterBottom
                align="center"
              >
                {movie.movieDetails.original_title}
              </Typography>
              
                <Box >
                  <TextField
                    variant="outlined"
                    className={classes.timeDateField}
                    label="Next Viewing"
                    type="datetime-local"
                    defaultValue={dateTime}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => setDateTime(event.target.value)}
                  />
                    <Button 
                      className={classes.saveButton}
                      color="primary" 
                      variant="contained" 
                      onClick={onSave}
                    >
                      <SaveIcon />
                    </Button>
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

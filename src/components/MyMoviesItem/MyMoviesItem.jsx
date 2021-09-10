import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

const MyMoviesItem = ({movie}) => {
    return (
        <Paper>
            <Typography>{movie.movieId}</Typography>
        </Paper>
    )
}

export default MyMoviesItem;

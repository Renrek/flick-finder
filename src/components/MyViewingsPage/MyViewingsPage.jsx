/**** SYSTEM ****/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

/**** SNIPPETS ****/
import getHumanReadableTime from '../../utility/getHumanReadableTime';
import getMonthDDYYYY from '../../utility/getMonthDDYYYY';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
    Paper,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Button,
} from '@material-ui/core';

/**** ICONS ****/
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

const MyViewingsPage = () => {

    /**** HOOKS ****/
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    /**** STATE ****/
    const viewingList = useSelector(store => store.viewingList);

    // Get viewing list for display
    React.useEffect(() => {
        dispatch({ type: 'FETCH_VIEWING_LIST' })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Date/Time</TableCell>
                        <TableCell align="center">Viewers</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {viewingList.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell align="left">
                            {getMonthDDYYYY(row.viewingDate)}<br />
                            {getHumanReadableTime(row.viewingDate)}
                        </TableCell>
                        <TableCell align="center">
                            {row.viewers.length + 1}
                        </TableCell>
                        <TableCell align="right">
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={()=>history
                                    .push(`/edit-viewing/${row.id}`)}
                            >
                                <SearchIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    
          
            
    )
}

export default MyViewingsPage;

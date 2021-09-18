/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
    Paper,
    Typography,
    TextField,
    ButtonGroup,
    Button
 } from '@material-ui/core';

 /**** ICONS ****/
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    searchButton: {
      float: 'right', 
      height: 52
    },
    searchField: {
      width: '75%',
    },
    addContactButton: {
        width: '100%', 
        marginTop: 20, 
        marginBottom: 20
    },
    buttonGroup: {
        width: '100%', 
        marginTop: 20, 
        marginBottom: 20
    },
    currentContactButton: {
        width: '100%',
    }
});

const MyContactsPage = () => {

    /**** HOOKS ****/
    const dispatch = useDispatch();
    const classes = useStyles();

    /**** STATE ****/
    const [searchField, setSearchField] = React.useState('')
    const contacts = useSelector(store => store.contacts);
    const contactsFound = useSelector(store => store.contactSearch)

    // Remove contact
    const handleDelete = (id) => {
        dispatch({
            type: 'DELETE_CONTACT',
            payload: id
        });
    };

    // contact lookup
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'FETCH_CONTACTS_SEARCH',
            payload: searchField
        })
        setSearchField('')
    };
    
    // append contact
    const handleAdd = (id) => {
        dispatch({
            type: 'SAVE_CONTACT',
            payload: { id }
        })
    };

    return (
        <>
            <Paper >
                <form
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextField 
                        required
                        label="Search"
                        className={classes.searchField}
                        variant="outlined"
                        value={searchField}
                        onChange={(event)=> setSearchField(event.target.value)}
                    />
                    <Button className={classes.searchButton} type="submit" variant="contained" color="primary"><SearchIcon /></Button>
                </form>
            </Paper>
            { contactsFound.length > 0 && 
            <Paper>
                <Typography 
                    variant="h5"
                >
                    Contacts Found
                </Typography>
                {contactsFound.map((contact)=>(
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.addContactButton}
                        startIcon={<AddIcon />}
                        onClick={() => handleAdd(contact.id)}
                    >
                        {contact.username}
                    </Button>
                ))}
                </Paper>
                }
                <Paper>
                <Typography  
                    variant="h5"
                >
                    Current
                </Typography>
                {contacts.map((contact)=> (
                    <ButtonGroup
                        className={classes.buttonGroup}
                        variant="contained"
                    >
                        <Button
                            className={classes.currentContactButton}
                            color="primary"
                        >
                            {contact.username}
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => handleDelete(contact.id)}
                        >
                            <DeleteIcon />
                        </Button>
                    </ButtonGroup>  
                ))}
            </Paper>
        </>
    )
}

export default MyContactsPage;

/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { 
    Paper,
    Typography,
    TextField,
    Chip,
    Button
 } from '@material-ui/core';

 /**** ICONS ****/
import FaceIcon from '@material-ui/icons/Face';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const MyContactsPage = () => {

    /**** HOOKS ****/
    const dispatch = useDispatch();

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
                        variant="outlined"
                        value={searchField}
                        onChange={(event)=> setSearchField(event.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary"><SearchIcon /></Button>
                </form>
                <Typography>Found</Typography>
                {contactsFound.map((contact)=>(
                    <Chip 
                        key={contact.id}
                        icon={<FaceIcon />}
                        deleteIcon={<AddCircleIcon />}
                        label={contact.username}
                        onDelete={() => handleAdd(contact.id)}
                        onClick={() => handleAdd(contact.id)}
                        color="primary"
                    />
                ))}
            </Paper>
           
            <Paper>
                <Typography>Current</Typography>
                {contacts.map((contact)=> (
                 
                    <Chip 
                        key={contact.id}
                        icon={<FaceIcon />}
                        label={contact.username}
                        onDelete={() => handleDelete(contact.id)}
                        onClick={() => handleDelete(contact.id)}
                        color="secondary"
                    />
                ))}
            </Paper>
        </>
    )
}

export default MyContactsPage;

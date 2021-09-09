/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
    Paper,
    Typography,
    TextField,
    Chip,
    Button
 } from '@material-ui/core';

 import FaceIcon from '@material-ui/icons/Face';
 import SearchIcon from '@material-ui/icons/Search';

const MyContactsPage = () => {
    const dispatch = useDispatch();

    const [searchField, setSearchField] = React.useState('')
    const contacts = useSelector(store => store.contacts);
    const contactsFound = useSelector(store => store.contactSearch)

    const handleDelete = (id) => {
        console.log(id);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'FETCH_CONTACTS_SEARCH',
            payload: searchField
        })
        setSearchField('')
    };

    console.log('search', contactsFound);
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
                    <p>{contact.username}</p>
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

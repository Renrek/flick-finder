/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
    Paper,
    Typography,
    TextField,
    Button
 } from '@material-ui/core';

import FaceIcon from '@material-ui/icons/Face';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const CreateViewingPage = () => {

    const [viewers, setViewers] = React.useState([])
    const contacts = useSelector(store => store.contacts);

    return (
        <div>
            <Paper>
                <Button>NOW</Button>
                <form  noValidate>
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        
                    />
                    
                </form>
                
            </Paper>
           <Paper>
            {contacts.map((contact) => (
                <Button key={contact.id} variant="contained" color="primary" style={{ width: '100%'}}>{contact.username}</Button>
            ))}  
            </Paper>
            <Button>FIND MY MOVIE</Button>
        </div>
    )
}

export default CreateViewingPage;

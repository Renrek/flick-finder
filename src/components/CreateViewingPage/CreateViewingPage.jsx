/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import ViewerButton from '../ViewerButton/ViewerButton';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
    Paper,
    Typography,
    TextField,
    Button
 } from '@material-ui/core';

const CreateViewingPage = () => {
    const dispatch = useDispatch();
    
    const contacts = useSelector(store => store.contacts);
    const viewers = useSelector(store => store.viewerList);
    const [dateTime, setDateTime] = React.useState(Date.now())

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(dateTime);
        console.log(viewers);
        dispatch({
            type: 'CREATE_VIEWING',
            payload: { viewingDate: dateTime, viewers }
        })
    }
    
    return (
        <div>
            <Paper>
                <form  noValidate onSubmit={handleSubmit}>
                    <TextField
                        label="Next Viewing"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        //value={dateTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setDateTime(event.target.value)}
                        
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Add Viewing
                    </Button>
                </form>
                
            </Paper>
           <Paper>
            {contacts.map((contact) => (
                <ViewerButton 
                    key={contact.userId}
                    contact={contact}
                />
            ))}  
            </Paper>
            
        </div>
    )
}

export default CreateViewingPage;
/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import formatDateForField from '../../utility/formatDateForField';

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
    const history = useHistory();

    const contacts = useSelector(store => store.contacts);
    const viewers = useSelector(store => store.viewerList);
    const [dateTime, setDateTime] = React.useState(formatDateForField())

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'CREATE_VIEWING',
            payload: { viewingDate: dateTime, viewers }
        });
        history.push('/viewing-scheduled');
    }
    
    React.useEffect(() => {
        dispatch({ type: 'UNSET_LAST_ADDED_VIEWING' })
    }, [])

    return (
        <div>
            <Paper>
                <form  noValidate onSubmit={handleSubmit}>
                    <TextField
                        label="Next Viewing"
                        type="datetime-local"
                        defaultValue={dateTime}
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

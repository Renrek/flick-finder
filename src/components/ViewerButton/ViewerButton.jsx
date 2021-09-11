import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { Button } from '@material-ui/core';

import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

const ViewerButton = ({ contact }) => {

    const dispatch = useDispatch();
    const viewers = useSelector(store => store.viewerList);
    const [isViewer, setIsViewer] = React.useState(viewers.includes(contact.userId))
    
    const toggleViewer = (id) => {
        let roster = viewers;
        if(roster.includes(id)){
            const index = roster.indexOf(id);
            if (index > -1) {
                roster.splice(index, 1);
            }
        } else {
            roster.push(id);
        }
        setIsViewer(roster.includes(contact.userId))
        dispatch({type: 'SET_VIEWER_LIST', payload: roster})
    }

    

    return (
        <Button 
            key={contact.userId}
            onClick={()=> toggleViewer(contact.userId)} 
            variant="contained" 
            color={ isViewer ? "primary" : "secondary"}
            style={{ width: '95%', margin: 10, }}
            >
                { isViewer ? "": "Add " }{contact.username}{ isViewer ? " - Attending ": "" }
        </Button>
    )
}

export default ViewerButton;

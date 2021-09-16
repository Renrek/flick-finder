/**** SYSTEM ****/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { Button } from '@material-ui/core';

/**** ICONS ****/ // will be incorperated near future, weekend styling
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

const ViewerButton = ({ contact }) => {

    /**** HOOKS ****/
    const dispatch = useDispatch();

    /**** STATE ****/
    // Viewer reducer : an array of viewer ids
    const viewers = useSelector(store => store.viewerList);
    // Local state if viewer id is within global veiwer array: value true/false
    const [isViewer, setIsViewer] = React.useState(viewers.includes(contact.userId))
    
    // Switch viewer from opposite state, to view, or not to view, ?
    const toggleViewer = (id) => {
        let roster = viewers;
        //Check if viewer is in array
        if(roster.includes(id)){
            //IF so, remove viewer
            const index = roster.indexOf(id);
            if (index > -1) {
                roster.splice(index, 1);
            }
        } else {
            //IF not add to array
            roster.push(id);
        }
        // Toggle local state
        setIsViewer(roster.includes(contact.userId));
        //Set global viewer list
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

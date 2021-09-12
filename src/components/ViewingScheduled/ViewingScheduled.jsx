import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ViewingScheduled = () => {
    const dispatch = useDispatch();

    const lastAddedViewing = useSelector(store => store.lastAddedViewing)
    dispatch({ type: 'FETCH_LAST_ADDED_VIEWING' });

    console.log('stuff',lastAddedViewing);
    return (
        <div>
            Viewing scheduled page 
        </div>
    )
}

export default ViewingScheduled;

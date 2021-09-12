import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ViewingScheduled = () => {
    const dispatch = useDispatch();

    const lastAddedViewing = useSelector(store => store.lastAddedViewing)
    React.useEffect(() => {
        dispatch({ type: 'FETCH_LAST_ADDED_VIEWING' });
    }, []);
    

    return (
        <div>
            Viewing scheduled page <p>{lastAddedViewing.movieId}</p>
            <p>{lastAddedViewing.viewingDate}</p>
            {lastAddedViewing.viewers &&
                lastAddedViewing.viewers.map(viewerId => (
                    <div key={viewerId}>{viewerId}</div>
            ))}
       
            
        </div>
    )
}

export default ViewingScheduled;

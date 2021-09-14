import React from 'react';
import { useParams } from 'react-router';

const EditViewingPage = () => {

    const { id } = useParams();

    return (
        <div>
            {id}
        </div>
    )
}

export default EditViewingPage;

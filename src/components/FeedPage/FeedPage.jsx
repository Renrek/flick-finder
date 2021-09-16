/**** SYSTEM ****/
import React from 'react';

/**** COMPONENTS ****/
import FeedNextViewing from '../FeedNextViewing/FeedNextViewing';
import FeedRecommend from '../FeedRecommend/FeedRecommend';

// Simple component ment to enable future adjustments
const FeedPage = () => {

    return (
        <div>
            <FeedNextViewing />
            <FeedRecommend />
        </div>
    )
}

export default FeedPage;

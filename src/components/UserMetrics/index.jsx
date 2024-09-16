import React from'react';

export default  function UserMetrics({metrics}) {

    const { VisitCount, RecoemmendedPosts } = metrics;

    return(
        <div className='metric- container'>
            <h2>User Data</h2>
            <ul>
                <li><strong>Amount of places visited:</strong> {VisitCount}</li>
                <li><strong>Amount of Recommended Locations:</strong> {RecoemmendedPosts}</li>
            </ul>
        </div>
    )
}
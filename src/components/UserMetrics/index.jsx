import React from'react';

export default  function UserMetrics({metrics}) {

    const { posts, followers, following, accountCreated } = metrics;

    return(
        <div className='metric- container'>
            <h2>User Data</h2>
            <ul>
                <li><strong>Posts:</strong> {posts}</li>
                <li><strong>Followers:</strong> {followers}</li>
                <li><strong>Following:</strong> {following}</li>
                <li><strong>Account Created:</strong> {accountCreated}</li>
            </ul>
        </div>
    )
}
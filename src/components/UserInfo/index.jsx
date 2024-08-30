import React from 'react';

export default function UserInfo({profilePic, username, email}) {
    return(
        <div className="user-info">
            <img src={profilePic} className='profile-pic'/>
            <h1>{username}</h1>
            <p>{email}</p>
        </div>
    )
}
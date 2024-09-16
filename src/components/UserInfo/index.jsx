import React from 'react';
//import { useUserAccount } from '../../contexts/userAccount';

export default function UserInfo({profilePic, username, email}) {

    //const { userAccountData } = useUserAccount
    return(
        <div className="user-info">
            <img src={profilePic} className='profile-pic'/>
            <h1>{username}</h1>
        </div>
    )
}
import React from 'react';
import UserInfo from '../../components/UserInfo';
import UserMetrics from '../../components/UserMetrics';
import SavedList from '../../components/SavedList';




export default function UserProfile({ User }) {
    return(
        <div className='profile-containers'>
            <div className='profile-container'>
                <UserInfo profilePic="../../assets/logo.png" username={user?.username} email={user?.email}/>
            </div>
            <div className='metrics'>
                <UserMetrics/>
            </div>
            <div className='saved-list-container'>
                <SavedList/>
            </div>
        </div>
    )
}

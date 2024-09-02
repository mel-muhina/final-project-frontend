import React from 'react';
import { useContext, useEffect } from 'react';
import UserInfo from '../../components/UserInfo';
import UserMetrics from '../../components/UserMetrics';
import SavedList from '../../components/SavedList';
import { LoginContext } from '../../App';
import { useUserAccount } from '../../contexts/userAccount';
import profilePic from '../../assets/logo.png';
import image1 from '../../assets/images/bg.png'
import image2 from '../../assets/images/home.png'
import image3 from '../../assets/images/home1.png'

const dummyImages = [
    { url: image1 }, 
    { url: image2 },
    { url: image3 }
];

const dummyMetrics = {
    posts: 120,
    followers: 350,
    following: 180,
    accountCreated: '2023-01-15'
};

export default function UserProfile({ }) {
    const loggedIn = useContext(LoginContext)
    const { userAccountData } = useUserAccount();

    useEffect(() => {
        console.log("Logged In: ", loggedIn)
        console.log(userAccountData.username)
        console.log(userAccountData.email)
    })
    
    return(

        <div className='profile-containers'>
            <div className='profile-container'>
                <UserInfo profilePic = {profilePic} username={userAccountData.username} email={userAccountData.email}/>
            </div>
            <div className='metrics'>
                <UserMetrics metrics = {dummyMetrics}/>
            </div>
            <div className='saved-list-container'>
                <SavedList images = {dummyImages} />
            </div>
        </div>
    )

}

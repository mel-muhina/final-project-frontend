import React from 'react';
import { useState, useContext, useEffect } from 'react';
import UserInfo from '../../components/UserInfo';
import UserMetrics from '../../components/UserMetrics';
import SavedList from '../../components/SavedList';
import { LoginContext } from '../../App';
import { useUserAccount } from '../../contexts/userAccount';
import profilePic from '../../assets/logo.png';


const dummyItems = [{ 

    place_id: 1,
    name: 'Hyde Park',
    location_type: 'park',
    description: 'A major park in central London.',
    position: {lat: 51.507268, long: -0.165730},
    address: 'London W2 2UH, UK',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hyde_Park_from_air.jpg/640px-Hyde_Park_from_air.jpg',
    tag_id: 1},

    { 
    place_id: 2,
    name: 'finsbury Park',
    location_type: 'park',
    description: 'A major park in north London.',
    position: {lat: 51.5646, long: -0.1047},
    address: 'London N4 1EE',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Finsbury_Park_-_geograph.org.uk_-_681145.jpg',
    tag_id: 1},

]

const dummyMetrics = {
    posts: 120,
    followers: 350,
    following: 180,
    accountCreated: '2023-01-15'
};

export default function UserProfile({ }) {
    const loggedIn = useContext(LoginContext)
    const { userAccountData } = useUserAccount();
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        console.log("Logged In: ", loggedIn)
        console.log(userAccountData.username)
        console.log(userAccountData.email)
        setSavedItems(dummyItems)
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
                <SavedList items = {savedItems} />
            </div>
        </div>
    )

}

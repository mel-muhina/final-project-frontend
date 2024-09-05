import React from 'react';
import { useState, useContext, useEffect } from 'react';
import UserInfo from '../../components/UserInfo';
import UserMetrics from '../../components/UserMetrics';
import SavedList from '../../components/SavedList';
import { useUserAccount } from '../../contexts/userAccount';
import profilePic from '../../assets/images/userprofile.jpg';
import './UserProfile.css'




export default function UserProfile({ }) {
    
    const { userAccountData } = useUserAccount();
    const [savedItems, setSavedItems] = useState([]);
    const [savedUsername, setUsername] = useState();
    const token = localStorage.getItem('authToken')
    const [visitCount, setVisitAmount] = useState()
    const [RecomendationCount, setRecCount] = useState()

    useEffect(() => {
      
        console.log(userAccountData.email)

        getSaved();
        getUsername();
        getVisitNum();
        getRecomendationNum();
    }, [])
    
    const getSaved = async () => {
    
        try {
            // const token = localStorage.getItem('authToken')
            const response = await fetch('http://54.89.47.53:3000/users/retrieve', {
              method: 'GET',
              headers: {
                
                'Authorization': `Bearer ${token}`}
              })
              const data = await response.json();
              
              if (response.ok) {
                const savedLocations = data.savedLocations || [];
                setSavedItems(savedLocations)
                console.log(savedLocations)
                console.log('Items retrieved successfully!');
                // Optionally, handle UI updates or further actions
            } else {
                console.error(`Failed to retrieve items: ${data.error}`);
                
            }
            } catch (err) {
            console.error('Error retrieving items:');
            console.log(err)
            }
        }

    const getUsername = async () => {
    
        try {
            //const token = localStorage.getItem('authToken')
            const response = await fetch('http://54.89.47.53:3000/users/stats', {
              method: 'GET',
              headers: {    
                'Authorization': `Bearer ${token}`}
              })
              const data = await response.json();
              console.log("1")
              console.log(token)
              console.log(data)
              
              if (response.ok) {
                console.log("2")
                setUsername(data.username)
                console.log(savedUsername)
                console.log('Item retrieved successfully!');
                // Optionally, handle UI updates or further actions
            } else {
                console.error(`Failed to retrieve item: ${data.error}`);
                
            }
            } catch (err) {
            console.error('Error retrieving item:');
            console.log(err)
            }
        }

        const getVisitNum = async () => {
    
            try {
                //const token = localStorage.getItem('authToken')
                const response = await fetch('http://54.89.47.53:3000/user-visits', {
                  method: 'GET',
                  headers: {    
                    'Authorization': `Bearer ${token}`}
                  })
                  const data = await response.json();
                  console.log("1")
                  console.log(token)
                  console.log(data)
                  
                  if (response.ok) {
                    console.log("2")
                    setVisitAmount(data.visit_count)
                    console.log(visitCount)
                    console.log('data retrieved successfully!');
                    // Optionally, handle UI updates or further actions
                } else {
                    console.error(`Failed to retrieve data: ${data.error}`);
                    
                }
                } catch (err) {
                console.error('Error retrieving data:');
                console.log(err)
                }
            }
        const getRecomendationNum = async () => {
            try {
                //const token = localStorage.getItem('authToken')
                const response = await fetch('http://54.89.47.53:3000/analysis/user-recommendations', {
                  method: 'GET',
                  headers: {    
                    'Authorization': `Bearer ${token}`}
                  })
                  const data = await response.json();
                  console.log("1")
                  console.log(token)
                  console.log(data)
                  
                  if (response.ok) {
                    console.log("2")
                    setRecCount(data.recommendation_count)
                    console.log(RecomendationCount)
                    console.log('data retrieved successfully!');
                    // Optionally, handle UI updates or further actions
                } else {
                    console.error(`Failed to retrieve data: ${data.error}`);
                    
                }
                } catch (err) {
                console.error('Error retrieving data:');
                console.log(err)
                }    

            }

    
    
    return(

        <div className='profile-containers'>
            <div className='profile-container'>
                <UserInfo profilePic = {profilePic} username={savedUsername} email={userAccountData.email}/>
            </div>
            <div className='metrics'>
                <UserMetrics  visits = {visitCount} RecomendationCount = {RecomendationCount}/>
            </div>
            <div className='saved-list-container'>
                <SavedList items = {savedItems} />
            </div>
        </div>
    )

}

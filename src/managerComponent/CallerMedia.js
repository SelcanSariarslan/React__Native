import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const Manager = () => {

    const [callerData, setCallerData] = useState([]);

    
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    useEffect(() => {
      const fetchCallerData = async () => {
        try {
          if (user) {
            const userId = user.uid;
            
            const policeDoc = await db.collection('police').doc(userId).get();
            const ambulanceDoc = await db.collection('ambulance').doc(userId).get();
            const fireDoc = await db.collection('fire').doc(userId).get();
    
            const policeData = policeDoc.data();
            const ambulanceData = ambulanceDoc.data();
            const fireData = fireDoc.data();
    
            const combinedData = [policeData, ambulanceData, fireData].filter(data => data !== undefined);
    
            setCallerData(combinedData[0]);
            
           
           
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };
    
      // Change the interval value to 2000 for every 2 seconds
    
      fetchCallerData();

    
    
      
    }, []);//callerData
    console.log("All the data ");
    console.log(callerData);

  return (
    <View>
      <Text>Make some buttons for showıng the media, You work will be in the CallerMedia.js, also you design will be inside thıs red part, after finshing your work you will delete the red backgroundColor </Text>
    </View>
  );
};

export default Manager;

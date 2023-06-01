import React, { useEffect, useState } from 'react';
import { View, Text, Button,TouchableOpacity,ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Image } from 'react-native';

const Caller = () => {
  const [callerData, setCallerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [collection, setCollection] = useState(null);


  
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    useEffect(() => {
      const fetchCallerData = async () => {
        try {
          if (user) {
            const userId = user.uid;
            setCurrentId(userId);
            const policeDoc = await db.collection('police').doc(userId).get();
            const ambulanceDoc = await db.collection('ambulance').doc(userId).get();
            const fireDoc = await db.collection('fire').doc(userId).get();
    
            const policeData = policeDoc.data();
            const ambulanceData = ambulanceDoc.data();
            const fireData = fireDoc.data();
    
            const combinedData = [policeData, ambulanceData, fireData].filter(data => data !== undefined);
    
            setCallerData(combinedData);
            setLoading(false);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };
    
      const interval = setInterval(() => {
        if (callerData[0]?.status === false) {
          fetchCallerData();
          console.log('Caller data status is false');
        } else {
          console.log('Caller data status is trueeeeeeee');
          clearInterval(interval);
        }
      }, 4000); // Change the interval value to 2000 for every 2 seconds
    
      fetchCallerData();
    
      return () => {
        clearInterval(interval);
      };
    }, [callerData]);
    
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
 console.log("callerData in the caller.js");
 // console.log(callerData[0].caller_emergencylevel);

 const addUserToFirestore = async () => {
  console.log(callerData[0].caller_id);
  const currentUser = firebase.auth().currentUser;
  if (callerData[0].caller_id && currentUser) {
    await firebase.firestore().collection('users').doc(callerData[0].caller_id).update({
      isAccepted: true,
    });
  }
};


  
  return (
    <ScrollView>
      <View>
        {callerData.map((data, index) => (
          <View key={index}>
            <Text>Caller ID: {data.caller_id}</Text>
            <Text>Caller Location: {data.caller_location}</Text>
            <Text>Calling Status: {data.calling_status}</Text>
            <Text>Caller Image: {data.caller_image}</Text>
           
            <Text>Caller status: {data.caller_emergencylevel}</Text>
            <Text>----------------------------------------</Text>
          </View>
        ))}
      </View>
      <Image
        source={{
          uri: callerData[0]?.caller_image,
        }}
        style={{ width: 200, height: 200 }}
      /> 
      <Button  color="red" title="send ok" onPress={addUserToFirestore} />
    </ScrollView>
  );
};

export default Caller;


/** <Text>Caller Emergency Level: {data.coller_emergencylevel}</Text>
            <Text>Caller Message: {data.coller_message}</Text>
            <Text>Caller Voice: {data.caller_voice}</Text> */
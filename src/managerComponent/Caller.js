import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Image } from 'react-native';

const Caller = () => {
  const [callerData, setCallerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

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
    useEffect(() => {
    const interval = setInterval(() => {
      if (callerData[0]?.status === false) {
        fetchCallerData();
      } else {
        console.log('Caller data status is trueeeeeeee');
        clearInterval(interval);
      }
    }, 4000);

    fetchCallerData();

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  console.log(callerData[0]?.status);
  
  return (
    <ScrollView>
      <View>
        {callerData.map((data, index) => (
          <View key={index}>
            <Text>Caller ID: {data.caller_id}</Text>
            <Text>Caller Location: {data.caller_location}</Text>
            <Text>Calling Status: {data.calling_status}</Text>
            <Text>Caller Image: {data.caller_image}</Text>
           
            <Text>Caller status: {data.status}</Text>
            <Text>----------------------------------------</Text>
          </View>
        ))}
      </View>
      <Image
        source={{
          uri: callerData[0]?.caller_image[0],
        }}
        style={{ width: 200, height: 200 }}
      />
    </ScrollView>
  );
};

export default Caller;


/** <Text>Caller Emergency Level: {data.coller_emergencylevel}</Text>
            <Text>Caller Message: {data.coller_message}</Text>
            <Text>Caller Voice: {data.caller_voice}</Text> */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Caller = () => {
  const [callerData, setCallerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

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

          setCallerData(combinedData);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchCallerData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        {callerData.map((data, index) => (
          <View key={index}>
            <Text>Caller ID: {data.caller_id}</Text>
            <Text>Caller Location: {data.caller_location}</Text>
            <Text>Calling Status: {data.calling_status}</Text>
            <Text>Caller Image: {data.caller_image}</Text>
            <Text>Caller Emergency Level: {data.coller_emergencylevel}</Text>
            <Text>Caller Message: {data.coller_message}</Text>
            <Text>Caller Voice: {data.caller_voice}</Text>
            <Text>----------------------------------------</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Caller;
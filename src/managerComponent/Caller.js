import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Caller = () => {
  const [callerId, setCallerId] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const db = firebase.firestore();

    const fetchCallerData = async () => {
      try {
        const userQuerySnapshot = await db.collection('users').where('location', '==', 1065).get();
        const userIds = userQuerySnapshot.docs.map((doc) => doc.id);

        if (userIds.length > 0) {
          const userId = userIds[0];

          await db.collection('ambulance').doc('pM4AzGh0FgMpmPq6k7oCWAozdor1').update({
            caller_id: userId
          });

          setCallerId(userId);
        } else {
          console.log('No user found with location: 954');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchCallerData();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Caller ID: {callerId}</Text>
      </View>
    </ScrollView>
  );
};

export default Caller;

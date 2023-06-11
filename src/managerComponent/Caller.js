import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Image } from 'react-native';
import AcceptCaller from './acceptCaller';
import { useNavigation } from '@react-navigation/native';
import ReciverTargetlocation from './manager';
import Map from './../component/Map';
import FastestResult from './../component/mapResultFastest';
import SSortestResult from './../component/mapResultShortest'
import Splash from '../smalComponent/splash';

const Caller = () => {
  const [callerData, setCallerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [collection, setCollection] = useState(null);
  const [showMessageToAccept, setShowMessageToAccept] = useState(null);
  const [caller_id, setCaller_id] = useState(null);
  const [callerIdExecuted, setCallerIdExecuted] = useState(false);
  const navigation = useNavigation();
  const reciverTargetlocation = ReciverTargetlocation.TargetVehiclelocation;
  const [isSplash, setIssplash] = useState(false);
  const [isMoved, setisMoved] = useState(true);



  const fastestresult = FastestResult.FasttestResult;
  const shortestresult = SSortestResult.ShortesrRes;
  console.log("5555555555555555555555555555555555555555555555500000000000000000005555555555555555555555555555555555555");
  console.log(fastestresult);
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
          if (!callerIdExecuted && combinedData[0].caller_image != null) {
            setCallerIdExecuted(true);
            setShowMessageToAccept(true);
          }

          /**if(showMessageToAccept != "")
          {
            console.log("ididididiidididididiiddi");
            console.log(showMessageToAccept);
          } */
          setLoading(false);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };


    const interval = setInterval(fetchCallerData, 3000); // Fetch data every 2 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, [callerData]);//callerData





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
    // console.log(callerData[0].caller_id);
    const currentUser = firebase.auth().currentUser;
    if (callerData[0].caller_id && currentUser) {
      await firebase.firestore().collection('users').doc(callerData[0].caller_id).update({
        isAccepted: true,
        ReciverLocation: reciverTargetlocation ? reciverTargetlocation : 100,
      });

    }
    setShowMessageToAccept(false);
    setisMoved(false);



    if (callerData[0]) {
      setTimeout(() => {
        setisMoved(true);
        navigation.navigate('Map', {
          location: callerData[0]?.location,
          caller_location: callerData[0]?.caller_location
        });
      }, 10000);
      //callerData[0]?.location, callerData[0]?.caller_location //, (callerData[0]?.location, callerData[0]?.caller_location)

    };
  }

  const handleCancel = () => {
    setShowMessageToAccept(false);

  };
  console.log(callerData[0]?.caller_location);


  return (
    <View>


      {/** */}{showMessageToAccept && isMoved ? <AcceptCaller CallerData={callerData} onPress={addUserToFirestore} oncancel={handleCancel} /> : null}
      {!showMessageToAccept && !isMoved ?
        <Splash
          title="My App"
          backgroundColor="#000000a2"
          textColor="white" /> : null
      }

      {isSplash ? <Splash
        title="My App"
        backgroundColor="#000000a2"
        textColor="white" /> : null
      }
    </View>

  );
};

export default Caller;


/** <Text>Caller Emergency Level: {data.coller_emergencylevel}</Text>
            <Text>Caller Message: {data.coller_message}</Text>
            <Text>Caller Voice: {data.caller_voice}</Text> */
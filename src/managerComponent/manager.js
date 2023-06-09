import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { unique_intersection } from './../component/ShortestPath';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import StatusPage from './StatusPage';
import Array from './array';
import Caller from './Caller';
import Instructurs from './instructurs'
import CallerMedia from './CallerMedia'
import SplashForReciving from './../smalComponent/splashForReciving'

export const Manager = () => {
  const [isReady, setIsReady] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [callerData, setCallerData] = useState([]);

  const handleImagePress = async () => {
    const randomNum = Math.floor(Math.random() * unique_intersection.length);
    setSelectedNumber(randomNum);
  };

  const handleButtonClick = () => {
    setIsReady(!isReady);
  };




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
  console.log("All the dataaaaaaa ");
  console.log(!!callerData.caller_image);


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isReady ? 'green' : 'red' }]}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText}>{isReady ? 'Cancel' : 'Ready'}</Text>
      </TouchableOpacity>
      <Text>{isReady}</Text>
      <View style={{ height: '65%', borderWidth: 2, borderRadius: 10 }}>



        {!isReady
          ?
          (!!callerData.caller_image ? <CallerMedia /> : <Instructurs />)
          :
          (!!callerData.caller_image ? <CallerMedia /> : <SplashForReciving />)
        }

        {(!callerData.caller_image && isReady) ? (
          <React.Fragment>
            <Text style={{ fontSize: 40, color: 'red', paddingLeft: 50, paddingTop: 20 }}>
              please be careful
            </Text>
            <Text style={{ fontSize: 30, color: 'red', paddingLeft: 23 }}>
              any time may you receive an emergency call message !!!
            </Text>
            <Text style={{ fontSize: 25, color: 'red', paddingTop: 89, paddingLeft: 20 }}>
              please Do not forget to Click
            </Text>
            <Text style={{ fontSize: 30, color: 'red', paddingTop: 1, paddingLeft: 130 }}>
              on the
            </Text>
            <Text style={{ fontSize: 30, color: 'red', paddingTop: 1, paddingLeft: 60 }}>
              "RECİVE A SERVICE"
            </Text>
          </React.Fragment>
        ) : ""}


      </View>
      <View style={styles.imageContainer}>
        <Text style={{ fontSize: 20, marginTop: 8, marginRight: 5, fontWeight: 'bold' }}>Get location:</Text>
        <TouchableOpacity onPress={handleImagePress}>
          {selectedNumber ? (
            <Image
              style={styles.imageGreen}
              source={require('../image/location.png')}
            />
          ) : <Image
            style={styles.imageRed}
            source={require('../image/location.png')}
          />}
        </TouchableOpacity>
        <Text style={{ fontSize: 13, marginTop: 15, fontWeight: 'bold', marginLeft: 5 }}></Text>
      </View>

      <StatusPage status={isReady} location={selectedNumber} />
      <Caller />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    height: 75,
  },
  buttonText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingBottom: 20,

  },
  imageRed: {
    width: 50,
    height: 50,
    borderWidth: 6,
    borderColor: 'red',
    borderRadius: 500,



  },
  imageGreen: {
    width: 50,
    height: 50,
    borderWidth: 6,
    borderColor: 'green',
    borderRadius: 500,




  },
  selectedNumber: {
    marginBottom: 10,
  },
});

export default Manager;

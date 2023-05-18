import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { unique_intersection } from './../component/ShortestPath';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const Manager = () => {
  const [isReady, setIsReady] = useState(true); // status  hep false
  const [selectedNumber, setSelectedNumber] = useState(null);  // location

  const handleImagePress = async () => {
    const randomNum = Math.floor(Math.random() * unique_intersection.length);
    setSelectedNumber(randomNum);

    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      const userEmail = user.email;

      let collectionName = '';

      if (userEmail.toLowerCase().includes('police')) {
        collectionName = 'police';
      } else if (userEmail.toLowerCase().includes('ambulance')) {
        collectionName = 'ambulance';
      } else if (userEmail.toLowerCase().includes('fire')) {
        collectionName = 'fire';
      }

      if (collectionName) {
        const locationData = {
          status: false,
          location: selectedNumber,
          userId: userId,
        };

        try {
          await firebase.firestore().collection(collectionName).doc(userId).update(locationData);
          console.log(`Location data added for the user in the ${collectionName} collection.`);
        } catch (error) {
          console.error(`Error adding location data in the ${collectionName} collection:`, error);
        }
      } else {
        console.error('Invalid collection name.');
      }
    }

    console.log("The coordinates of location: [" + selectedNumber + "] is: " + unique_intersection[selectedNumber]);
  };

  const handleButtonClick = () => {
    setIsReady(!isReady);
  };

  console.log(isReady);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isReady ? 'green' : 'red' }]}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText}>{isReady ? 'Cancel' : 'Ready'}</Text>
      </TouchableOpacity>
      <Text>{isReady}</Text>
      <View style={styles.container}>
        {selectedNumber ? (
          <Text style={styles.selectedNumber}>
            {unique_intersection[selectedNumber]}
          </Text>
        ) : null}
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            style={styles.image}
            source={require('../image/location.png')}
          />
        </TouchableOpacity>
      </View>
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Manager;

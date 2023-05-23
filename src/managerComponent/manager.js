import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { unique_intersection } from './../component/ShortestPath';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import StatusPage from './StatusPage';
import Array from './array';
import Caller from './Caller';
export const Manager = () => {
  const [isReady, setIsReady] = useState(true); // status  hep false
  const [selectedNumber, setSelectedNumber] = useState(null);  // location

  const handleImagePress = async () => {
    const randomNum = Math.floor(Math.random() * unique_intersection.length);
    setSelectedNumber(randomNum);

    console.log("The coordinates of location: [" + selectedNumber + "] is: " + unique_intersection[selectedNumber]);
  };

  const handleButtonClick = () => {
    setIsReady(!isReady);
  };

  console.log(isReady);

  return (
    <View style={styles.container}>
      <Caller/>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isReady ? 'green' : 'red' }]}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText}>{isReady ? 'Cancel' : 'Ready'}</Text>
      </TouchableOpacity>
      <Text>{isReady}</Text>
      
      <Array/>
      
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
      <StatusPage status={isReady} location={selectedNumber}/>
    
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

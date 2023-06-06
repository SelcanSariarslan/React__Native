import React, { useState } from 'react';
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

export const Manager = () => {
  const [isReady, setIsReady] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleImagePress = async () => {
    const randomNum = Math.floor(Math.random() * unique_intersection.length);
    setSelectedNumber(randomNum);
  };

  const handleButtonClick = () => {
    setIsReady(!isReady);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isReady ? 'green' : 'red' }]}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText}>{isReady ? 'Cancel' : 'Ready'}</Text>
      </TouchableOpacity>
      <Text>{isReady}</Text>
      <View style={{ height: '65%',borderWidth:2, borderRadius:10}}>

    

       {isReady ? <CallerMedia />: <Instructurs /> }
       
        

      </View>
      <View style={styles.imageContainer}>
        <Text style={{fontSize:20,marginTop:8,marginRight:5,fontWeight:'bold'}}>Get location:</Text>
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
        <Text style={{fontSize:13,marginTop:15,fontWeight:'bold',marginLeft:5}}>{selectedNumber}</Text>
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
    paddingBottom:20,
    
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

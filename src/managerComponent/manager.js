// status hep false + location + userId=""

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
import { unique_intersection } from './../component/ShortestPath';

export const Manager = () => {
  const [isReady, setIsReady] = useState(true); // status  hep false
  const [selectedNumber, setSelectedNumber] = useState(null);  // location


  const handleImagePress = () => {
    const randomNum = Math.floor(Math.random() * unique_intersection.length) + 1;
    setSelectedNumber(randomNum);
    console.log("the cordinates of: [" + selectedNumber + "]--> is: " + unique_intersection[randomNum]);

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
    padding:10,
    
    
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems:'center',
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

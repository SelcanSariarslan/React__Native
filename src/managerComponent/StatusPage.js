import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';



const StatusPage = (props) => {
  const [inputName, setInputName] = useState('');
  const status = props.status;
  const location = props.location;
  const [displayedImageUrl, setDisplayedImageUrl] = useState(null);
  //console.log(location);

 
const fetchImage = async () => {
  try {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = "28jyqz2zoYZ5GmSuVundC0MZTfG2";

      // Retrieve the image URL from the Firestore document or storage
      const docSnapshot = await firebase.firestore().collection('users').doc(uid).get();
      const userData = docSnapshot.data();
      const imageUrl = userData?.userDetails?.image;

      // Update the displayedImageUrl state
      setDisplayedImageUrl(imageUrl);
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};
  
  const addUserToFirestore = async () => {
    console.log(displayedImageUrl);
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
        status: status,
        location: location,
        Id: userId,
        
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

    
  };



  return (
    <View>
      <Button color="red" title="Save" onPress={addUserToFirestore} />
      <TouchableOpacity onPress={fetchImage}>
        <Text>Display Image</Text>
      </TouchableOpacity>
      {displayedImageUrl && <Image source={{ uri: displayedImageUrl }} style={styles.image} />}
    </View>
  );
};

export default StatusPage;

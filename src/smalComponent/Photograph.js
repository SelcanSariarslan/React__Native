import React, { useState } from 'react';
import { View, Button, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const TextArea = () => {
  const [inputName, setInputName] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const addUserToFirestore = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const userDetails = {
        detail: inputName,
        image: null
      };
      if (imageUri) {
        // Resim seçildiyse storage'a yükle ve resim url'ini userDetails'a ekle
        const imageRef = firebase.storage().ref().child(`images/${uid}/${Date.now()}.jpg`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await imageRef.put(blob);
        const downloadUrl = await imageRef.getDownloadURL();
        userDetails.image = downloadUrl;
      }
      // userDetails'u Firestore'a ekle
      await firebase.firestore().collection('users').doc(uid).set(userDetails);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 200, borderColor: 'gray', borderWidth: 3, marginBottom: 10 }}
        multiline={true}
        numberOfLines={4}
        onChangeText={setInputName}
        value={inputName}
        placeholder=" Can you explain the event?"
      />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button color="red" title="Choose Image" onPress={pickImage} />
      <Button color="red" title="Save" onPress={addUserToFirestore} />
    </View>
  );
};

export default TextArea;


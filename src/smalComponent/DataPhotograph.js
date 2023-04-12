/*import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { RNCamera } from 'react-native-camera';

const ExampleComponent = () => {
  const [imageURI, setImageURI] = useState(null);
  const cameraRef = React.useRef(null);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      // Fotoğrafın adını oluşturuyoruz.
      const fileName = `photo-${Date.now()}.jpg`;

      // Fotoğrafı Firebase Storage'a yüklüyoruz.
      const storageRef = storage().ref(fileName);
      await storageRef.putFile(data.uri);

      // Fotoğrafın indirilebilir URL'sini alıyoruz.
      const downloadURL = await storageRef.getDownloadURL();

      // Fotoğrafın URL'si ve diğer verileri Firestore'a kaydediyoruz.
      await firestore().collection('photos').add({
        url: downloadURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // imageURI değişkenini güncelleyerek fotoğrafı ekranda gösteriyoruz.
      setImageURI(data.uri);
    }
  };

  return (
    <View>
      {imageURI && (
        <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />
      )}
      <RNCamera ref={cameraRef} style={{ flex: 1 }} />
      <Button title="Take Photo" onPress={handleTakePhoto} />
    </View>
  );
};

export default ExampleComponent;*/

import React, { useState } from 'react';
import { View,  } from 'react-native';
import { Button, Input } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DataPhotograph = ({ navigation }) => {
  const [user, setUser] = useState({
    name: ''
  });

  const createUser = async (user) => {
    try {
      await firestore().collection('user').doc().set(user);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Input
        value={user.name}
        onChangeText={(name) => { setUser({...user, name: name}) }}
        placeholder='Enter name'
        leftIcon={{ type: 'font-awesome', name: 'header' }}
      />
      <Button title='SEND' onPress={() => { createUser(user) }} />
    </View>
  );
};

export default DataPhotograph;


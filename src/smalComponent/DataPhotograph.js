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

/*import React, { useState } from 'react';
import { View, Button, Text, doc } from 'react-native';
import { Input } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const DataPhotograph = ({ navigation }) => {
  const [users, setUsers] = useState({
    name: ''
  });

  const createUser = async (users) => {
    try {
      await firestore().collection('users').doc('').set(users);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
      <Input
        value={user.name}
        onChangeText={(name) => { setUsers({ ...users, name: name }); } }
        placeholder='Enter name'
        leftIcon={{ type: 'font-awesome', name: 'header' }} />
      <View style={{ marginTop: 20 }}>
        <Button
          title="SEND"
          onPress={() => { createUser(users); } }
          color="blue"
          titleStyle={{ color: 'white' }} />
      </View>
    </View>
  );
};

export default DataPhotograph;*/
/* kullanıcının ADINIII VERİ TABANINDAN ALIYORRR!!!!
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const DataPhotograph = () => {
const [userName, setUserName] = useState('');

const fetchUserName = async () => {
const currentUser = firebase.auth().currentUser;
if (currentUser) {
const uid = currentUser.uid;
const userDoc = await firebase.firestore().collection('users').doc(uid).get();
if (userDoc.exists) {
const { name } = userDoc.data();
setUserName(name);
} else {
console.log('Kullanıcı belirtilen belgede yok');
}
}
};

useEffect(() => {
fetchUserName();
}, []);

return (
<View>
<Text>Kullanıcının adı: {userName}</Text>
<Button title="Adı Göster" onPress={fetchUserName} />
</View>
);
};

export default DataPhotograph;*/
/* Kullanıcıya ad giren ve ekrana yazdıran
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const DataPhotograph = () => {
  const [userName, setUserName] = useState('');
  const [inputName, setInputName] = useState('');

  const fetchUserName = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const userDoc = await firebase.firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        const { name } = userDoc.data();
        setUserName(name);
      } else {
        console.log('Kullanıcı belirtilen belgede yok');
      }
    }
  };

  const addUserToFirestore = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      await firebase.firestore().collection('users').doc(uid).set({
        name: inputName,
      });
      setUserName(inputName);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <View>
      <Text>Kullanıcının adı: {userName}</Text>
      {userName ? (
        <Button title="Adı Göster" onPress={fetchUserName} />
      ) : (
        <>
          <TextInput
            placeholder="İsminizi girin"
            value={inputName}
            onChangeText={setInputName}
          />
          <Button title="Kaydet" onPress={addUserToFirestore} />
        </>
      )}
    </View>
  );
};

export default DataPhotograph;*/
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import * as Permissions from 'expo-permissions'; // yeni eklendi
import { Audio } from 'expo-av'; // yeni eklendi

const DataPhotograph = () => {
  const [userName, setUserName] = useState('');
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [voiceURI, setVoiceURI] = useState(null);

  const fetchUserName = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const userDoc = await firebase.firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        const { name } = userDoc.data();
        setUserName(name);
      } else {
        console.log('Kullanıcı belirtilen belgede yok');
      }
    }
  };

  const addVoiceRecord = async () => {
    if (!voiceURI) {
      console.log('Ses kaydı yapmadınız.');
      return;
    }

    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      await firebase.firestore().collection('users').doc(uid).update({
        voice: voiceURI
      });
      console.log('Ses kaydı başarıyla kaydedildi.');
    } else {
      console.log('Lütfen önce giriş yapın.');
    }
  }

  useEffect(() => {
    fetchUserName();
  }, []);

  const handleRecordVoice = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      console.log('Ses kaydı yapmak için izin vermelisiniz.');
      return;
    }

    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      console.log('Ses kaydı başladı.');

      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        const { uri } = recording.getURI();
        setVoiceURI(uri);
        setVoiceRecorded(true);
        console.log('Ses kaydı başarıyla kaydedildi.');
      }, 5000); // 5 saniye sonra kayıt otomatik olarak durdurulacak
    } catch (error) {
      console.log('Ses kaydı sırasında bir hata oluştu: ', error);
    }
  }

  return (
    <View>
      <Text>Kullanıcının adı: {userName}</Text>
      {voiceRecorded ? (
        <Text style={{ marginTop: 10 }}>Kaydedilen ses: {voiceURI}</Text>
      ) : null}
      <Button title="Ses Kaydı Yap" onPress={handleRecordVoice} />
      <Button title="Ses Kaydını Kaydet" onPress={addVoiceRecord} />
    </View>
  );
};

export default DataPhotograph;








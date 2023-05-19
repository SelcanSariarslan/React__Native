import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
const styles = StyleSheet.create({
  playButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    fontSize: 24,
    marginLeft: 8,
  },
});



const Media = (props) => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [recordingUri, setRecordingUri] = useState(null);
  const location = props.location;
  const emergency_level = props.level;

  const playRecording = async () => {
    try {
      if (!recordingUri) {
        console.log(recordingUri)
        throw new Error('Kaydedilen ses dosyası yok.');
      }

      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: recordingUri });
      await soundObject.playAsync();
    } catch (err) {
      console.error('Ses çalınırken bir hata oluştu:', err);
    }
  };

  useEffect(() => {
    // microphone erişimi izni alma
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Mikrofon erişim izni verilmedi');
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setTranscription('');

      if (recording) { // Eğer kayıt nesnesi varsa önce sonlandırın
        await recording.stopAndUnloadAsync();
      }

      // Ses kaydı başlatma
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (err) {
      console.error('Kayıt başlatılırken bir hata oluştu:', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setTranscription('');

    if (recording) { // Eğer kayıt nesnesi varsa önce sonlandırın
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingUri(uri);
      } catch (err) {
        console.error('Kayıt durdurulurken bir hata oluştu:', err);
      }
    }
  };


  const addVoiceToFirestore = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser && recordingUri) {
      const uid = currentUser.uid;
      const voiceRef = firebase.storage().ref().child(`voices/${uid}/${Date.now()}.caf`);

      // kaydedilen ses dosyasını storage'a yükleme
      const response = await fetch(recordingUri);
      const blob = await response.blob();
      await voiceRef.put(blob);
      console.log(recordingUri);
      // kaydedilen ses dosyasının url'sini alma
      const downloadUrl = await voiceRef.getDownloadURL();

      // Firestore'a ses dosyası url'sini kaydetme
      await firebase.firestore().collection('users').doc(uid).update({
        voiceUrl: downloadUrl
      }, { merge: true });
    }
  };
  const [inputName, setInputName] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const addUserInfoToFirestore = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const userDetails = {

        detail: inputName,
        image: null,
        voiceUrl: null
      };

      // Kullanıcının adını ve resmini kaydet
      if (inputName) {
        userDetails.detail = inputName;
      }

      if (imageUri) {
        const imageRef = firebase.storage().ref().child(`images/${uid}/${Date.now()}.jpg`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await imageRef.put(blob);
        const downloadUrl = await imageRef.getDownloadURL();
        userDetails.image = downloadUrl;
      }

      // Ses dosyasını Firebase Storage'a yükle ve ses dosyasının URL'sini Firestore'a kaydet
      if (recordingUri) {
        const voiceRef = firebase.storage().ref().child(`voices/${uid}/${Date.now()}.caf`);
        const response = await fetch(recordingUri);
        const blob = await response.blob();
        await voiceRef.put(blob);
        const downloadUrl = await voiceRef.getDownloadURL();
        userDetails.voiceUrl = downloadUrl;
      }

      await firebase.firestore().collection('users').doc(uid).update({
        userDetails,
        location: location,
        emergency_level: emergency_level
      });
    }
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
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
        placeholder="Can you explain the event?"
      />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}

      <View style={styles.playButtonContainer}>
        <Ionicons name="ios-camera" size={40} color="red" onPress={pickImage} />
        <Text style={styles.playButtonText}> Take Photo</Text>
      </View>

      {isRecording ? (
        <View style={styles.playButtonContainer}>
          <Ionicons name="ios-pause" size={40} color="red" onPress={stopRecording} />
          <Text style={styles.playButtonText}>Click and Stop</Text>
        </View>
      ) : (
        <View style={styles.playButtonContainer}>
          <Ionicons name="ios-play" size={40} color="red" onPress={startRecording} />
          <Text style={styles.playButtonText}>Click and Talk</Text>
        </View>
      )}

      {transcription && <Text>{transcription}</Text>}

      <Button color="red" title="Save" onPress={addUserInfoToFirestore} />
    </View>

  );
};

export default Media;

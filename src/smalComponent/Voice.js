import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
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

const Voice = () => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [recordingUri, setRecordingUri] = useState(null);

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
      await firebase.firestore().collection('users').doc(uid).set({
        voiceUrl: downloadUrl
      }, { merge: true });
    }
  };
  


  return (
    <View>
      {isRecording ? (
            //<Ionicons name="ios-pause" size={40} color="red" onPress={stopRecording} />
            <View style={styles.playButtonContainer}>
            <Ionicons name="ios-pause" size={40} color="red" onPress={stopRecording} />
            <Text style={styles.playButtonText}>Click and Stop</Text>
          </View>  
        //<Button color="red" title="Duraklat" onPress={stopRecording} />
      ) : (
        //<Ionicons name="ios-play" size={40} color="red" onPress={startRecording} />
        //<Button color="red" title="Click and talk" onPress={startRecording} />
        <View style={styles.playButtonContainer}>
        <Ionicons name="ios-play" size={40} color="red" onPress={startRecording} />
        <Text style={styles.playButtonText}>Click and Talk</Text>
      </View>
      )}
      {transcription ? <Text>{transcription}</Text> : null}
      <Button color="red" title="Record audio" onPress={addVoiceToFirestore} />
      

    </View>
  );
};

export default Voice;

import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const Voice = () => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [recordingUri, setRecordingUri] = useState(null);
  const playRecording = async () => {
    try {
      if (!recordingUri) {
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

      // ses kaydı başlatma
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error('Kayıt başlatılırken bir hata oluştu:', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setTranscription('');

    // kaydedilen ses dosyasını durdurma ve alma
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri);
    } catch (err) {
      console.error('Kayıt durdurulurken bir hata oluştu:', err);
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
        <Button color="red" title="Duraklat" onPress={stopRecording} />
      ) : (
        <Button color="red" title="Click and talk" onPress={startRecording} />
      )}
      {transcription ? <Text>{transcription}</Text> : null}
      <Button color="red" title="Record audio" onPress={addVoiceToFirestore} />
      <Button color="red" title="Listen Record" onPress={playRecording} />

    </View>
  );
};

export default Voice;

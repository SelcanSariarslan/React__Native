import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Splash from './../smalComponent/splash';
import Splashbox from './../smalComponent/splashbox';

import { Alert, ActivityIndicator } from 'react-native';

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
  const [loading, setLoading] = useState(false);
  const [splashbox, setSplashbox] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [splashHidden, setSplashHidden] = useState(false);
  const [data, setData] = useState(null);

  const userLocation = props.Location;
  const userEmergency_level = props.EmergencyLevel;
  const caller_object = props.Caller_object;
  const caller_id = props.CallerId;
  const collection = props.Collection;

  useEffect(() => {
    // microphone erişimi izni alma
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Mikrofon erişim izni verilmedi');
      }
    })();
  }, []);



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

  const combine = async () => {
    try {
      // waiting();
      showLoadingIndicator();
      await addUserInfoToFirestore();
      // await new Promise(resolve => setTimeout(resolve, 1000));
      hideLoadingIndicator();
      showSplashbox();
      //  await new Promise(resolve => setTimeout(resolve, 7000));


    } catch (error) {
      console.error('Error:', error);
    }
  };





  const showMessage = () => {
    Alert.alert('Added, we are waiting the service to accept you');
  };

  const showLoadingIndicator = () => {
    setLoading(true);
  };

  const hideLoadingIndicator = () => {
    setLoading(false);
  };
  const showSplashbox = () => {
    setSplashbox(true);
  };

  const hideSplashboxx = () => {
    setSplashbox(false);
  };

  const addUserInfoToFirestore = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const userDetails = {
        emergency_explenation: inputName,
        image: null,
        voiceUrl: null,
        location: userLocation,
        emergency_level: userEmergency_level,
        Id: uid
      };


      // Kullanıcının resmini kaydet
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

      await firebase.firestore().collection('users').doc(uid).set(userDetails, { merge: true });
    }
  };





  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqq");

  console.log(caller_object);

  {/**


  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users')
      .doc(caller_object?.Id)
      .onSnapshot((snapshot) => {
        const changedData = snapshot.data();
        setData(changedData);
        
      });
      const fetchCallerData = async () => {
        //   await new Promise(resolve => setTimeout(resolve, 1000));
        const hideSplashbox = () => {
          if (!splashHidden) {
            // console.log("*********************************");
            setSplashHidden(true);
            setAccepted(true);

          }
        };

        if (data?.isAccepted === true) {

          hideSplashbox();


        }
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(data?.isAccepted);
        const db = firebase.firestore();

        //console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwww");
        //  console.log(caller_object.emergency_level);

        try {
          // const userQuerySnapshot = await db.collection("users").where('location', '==', callerLocation[0]).get();  // callerLocation[0]
          // const userIds = userQuerySnapshot.docs.map((doc) => doc.id);
          // console.log("********************************************");
          //  console.log(caller_id);
          if (caller_id) {


            await db.collection(collection).doc("BS4FKnewJyeUoXyA6TzebsgWZNg1").update({  //targetVehicleId[0]
              caller_id: changedData?.Id,
              caller_location: changedData?.location,
              caller_image: changedData?.image,
              caller_emergencylevel: changedData?.emergency_level,
              caller_message: changedData?.emergency_explenation,
              caller_name: changedData?.name,

            });
            //  console.log('added to Vehicleeeeeeeeeeeeeeeee  ' + caller_id);

          } else {
            console.log('No user found with location: 954');
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };
      fetchCallerData();
      if (data?.isAccepted === true) {
        setAccepted(true);

      } else {
        setAccepted(false);
        hideSplashboxx(false);
      }
    return () => {
      // Cleanup the listener when the component unmounts
      unsubscribe();
    };
    








  }, []);








*/}






  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users')
      .doc(caller_object?.Id)
      .onSnapshot((snapshot) => {
        const changedData = snapshot.data();
        setData(changedData);
      });

    return () => {
      // Cleanup the listener when the component unmounts
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const fetchCallerData = async () => {
      //   await new Promise(resolve => setTimeout(resolve, 1000));
      const hideSplashbox = () => {
        if (!splashHidden) {
          // console.log("*********************************");
          setSplashHidden(true);
          setAccepted(true);

        }
      };

      
      if(caller_object?.isAccepted === false && accepted === true) {
        setAccepted(false);
        showSplashbox();

      }
        if(caller_object?.isAccepted === true && accepted === false ) {
        setAccepted(false);
        hideSplashboxx();
        props.moveTomap();

      }

      const db = firebase.firestore();

      //console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwww");
      //  console.log(caller_object.emergency_level);

      {/** console.log("settttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
    console.log("caller_emergencylevel:  " +caller_emergencylevel[0]);
    console.log("callerLocation[0]:  " +callerLocation[0]);
    console.log("caller_image[0]:  " +caller_image[0]); */}

      try {
        // const userQuerySnapshot = await db.collection("users").where('location', '==', callerLocation[0]).get();  // callerLocation[0]
        // const userIds = userQuerySnapshot.docs.map((doc) => doc.id);
        // console.log("********************************************");
        //  console.log(caller_id);
        if (caller_id) {


          await db.collection(collection).doc("BS4FKnewJyeUoXyA6TzebsgWZNg1").update({  //targetVehicleId[0]
            caller_id: caller_object?.Id,
            caller_location: caller_object?.location,
            caller_image: caller_object?.image,
            caller_emergencylevel: caller_object?.emergency_level,
            caller_message: caller_object?.emergency_explenation,
            caller_name: caller_object?.name,

          });
          //  console.log('added to Vehicleeeeeeeeeeeeeeeee  ' + caller_id);

        } else {
          console.log('No user found with location: 954');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchCallerData();
  }, [caller_object]);




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

      <Button color="blue" title="Save" onPress={combine} />

      <View>
        {loading ? (
          <Splash
            title="My App"
            backgroundColor="#000000a2"
            textColor="white"
          />
        ) : (
          <Text>Content goes here</Text>
        )}
        {splashbox === true && accepted === false ? <Splashbox /> : true}

      </View>
    </View>
  );
};

export default Media;
``


import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { View, Button, TextInput, Image, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Splash from './../smalComponent/splash';
import Splashbox from './../smalComponent/splashbox';
import ReciverTargetlocation from './../managerComponent/manager';

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
  }, container: {
    flex: 1,
  },
  playButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playButtonContainer: {
    alignItems: 'center',
  },
  playButtonText: {
    // Your play button text styles
  },
  image: {


    width: 50,
    height: 50,

  },


});

const Media = (props) => {
  const { navigation } = props;
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [recordingUri, setRecordingUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [splashbox, setSplashbox] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [splashHidden, setSplashHidden] = useState(false);
  const [data, setData] = useState(null);
  const [MovetoMap, setMoveToMap] = useState(false);
  const [clearData, setClearData] = useState(true);
  const [modal2Visible, setModal2Visible] = useState(false);



  const reciverLocation = props.ReciverLocation;
  const userLocation = props.Location;
  const userEmergency_level = props.EmergencyLevel;
  const caller_object = props.Caller_object;
  const caller_id = props.CallerId;
  const collection = props.Collection;
  const targetVehicleId = props.TargetVehicleId;
  const reciverTargetlocation = ReciverTargetlocation.TargetVehiclelocation;



  useEffect(() => {

    if (clearData) {
      setClearData(false);
      clearUserData();

    }
  }, []);

  const openModal2 = () => {
    setModal2Visible(true);
  };
  const closeModal2 = () => {
    setModal2Visible(false);
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
        location: userLocation ? userLocation : 0,
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


      if (caller_object?.isAccepted === false && accepted === true) {
        setAccepted(false);
        showSplashbox();

      }
      if (caller_object?.isAccepted === true && accepted === false) {
        setAccepted(false);
        hideSplashboxx();
        if (!MovetoMap && true) {
          // setTimeout(() => {
          props.moveTomap();
          setMoveToMap(true);
          //  }, 5000);

        }




      }
      {/**if(toMap === true ){
        props.moveTomap();
        setToMap(false);
        
      } */}

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


          await db.collection(collection).doc(targetVehicleId).update({  //targetVehicleId  cQjMfetencet3xZVJ9dNreGjtW93
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




  const clearUserData = async () => {



    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const userDetails = {
        emergency_explenation: null,
        image: null,
        voiceUrl: null,
        location: null,
        emergency_level: null,
        isAccepted: false,
      };

      await firebase.firestore().collection('users').doc(uid).set(userDetails, { merge: true });

      // Polis koleksiyonundaki kullanıcının verilerini boşaltma
      await firebase.firestore().collection('police').doc(uid).set(userDetails, { merge: true });

      // İtfaiye koleksiyonundaki kullanıcının verilerini boşaltma
      await firebase.firestore().collection('fire').doc(uid).set(userDetails, { merge: true });

      // Ambulans koleksiyonundaki kullanıcının verilerini boşaltma
      await firebase.firestore().collection('ambulance').doc(uid).set(userDetails, { merge: true });
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
  useEffect(() => {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const addUserToFirestore = async () => {
      // console.log(callerData[0].caller_id);

      if (currentUser) {
        await firebase.firestore().collection('users').doc(caller_id).update({
          ReciverLocation: reciverLocation,
        });

      }

    };
    addUserToFirestore();

  }, [userLocation]);

  //console.log("settttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
  // console.log(reciverLocation)





  return (
    <View  >
      <View style={{}}>
        <Text style={{ color: 'red', fontSize: 25, fontWeight: 'bold', paddingBottom: 4, paddingLeft: '5%' }}>Explain In Short:</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TextInput
          style={{ height: 70, width: '91%', borderColor: 'red', borderWidth: 2, marginBottom: 0, borderRadius: 10 }}
          multiline={true}
          numberOfLines={4}
          onChangeText={setInputName}
          value={inputName}
          placeholder="  Please explain the event in short"
        />
      </View>





      <View style={styles.container}>
        <View style={styles.playButtonRow}>
          <View style={styles.playButtonContainer}>
            <Ionicons name="ios-camera" size={80} color="red" onPress={pickImage} />
            {imageUri ?
              <TouchableOpacity onPress={openModal2}>
                <Text style={{ paddingTop: 0, fontSize: 20, color: 'green' }}>View</Text>
              </TouchableOpacity>
              :
              <Text style={{ paddingTop: 0, fontSize: 20 }}>Take a Photo</Text>

            }

          </View>

          {isRecording ? (
            <View style={styles.playButtonContainer}>
              <Ionicons name="ios-pause" size={80} color="red" onPress={stopRecording} />
              <Text style={{ paddingTop: 0 ,fontSize: 20 }}> Recording</Text>
            </View>
          ) : (
            <View style={styles.playButtonContainer}>
              <Ionicons name="ios-play" size={80} color="red" onPress={startRecording} />
            {/**  <Text style={{ paddingTop: 0, fontSize: 20 }}>Record a Voice</Text>
              */}
             <TouchableOpacity >
                <Text style={{ paddingTop: 0, fontSize: 20, color: 'green' }}>Listen</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ height: 20 }}>

        </View>
      </View>


      {transcription && <Text>{transcription}</Text>}


      <TouchableOpacity onPress={combine} >
        <Text style={{width:'100%',color: 'white',backgroundColor:'red', fontSize: 25, fontWeight: 'bold', borderWidth:1.5, padding:10,borderRadius:5,alignSelf:'flex-start',textAlign:'center'}}>CALL THE SERVIE</Text>
      </TouchableOpacity>

      <Modal visible={modal2Visible} animationType="fade" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', paddingTop: 40 }}>
            <Text style={styles.label}></Text>
            {imageUri && (
              <Image source={{ uri: imageUri }} style={{ width: '100%', height: '60%', paddingTop: 50 }} />
            )}
            <View style={{ height: 60 }} ></View>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                marginTop: 10,
                alignItems: 'center', // Center the content horizontally
                justifyContent: 'center', // Center the content vertically
              }}
              onPress={closeModal2}
            >
              <Text style={{ fontSize: 18, color: 'white', fontSize: 30 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        {loading ? (
          <Splash
            title="My App"
            backgroundColor="#000000a2"
            textColor="white"
          />
        ) : (
          <Text></Text>
        )}
        {splashbox === true && accepted === false ? <Splashbox /> : true}

      </View>
    </View>
  );
};

export default Media;
``

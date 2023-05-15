import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import firebase from 'firebase/app';
import Station from './Station';
import 'firebase/firestore';
import FirstInstruction from '../instructions/Instruction';
import { NavigationContainer } from '@react-navigation/native';
export default function LoginScreen({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [modalVisible, setModalVisible] = useState(true);

const onCancel = () => {
setModalVisible(false);
};

const handleConfirm = () => {
setModalVisible(false);
};

useEffect(() => {
if (firebase.auth().currentUser) {
firebase.auth().signOut();
}
}, []);

const navigationRef = useRef(null);

const handleLogin = () => {
  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      console.log('User logged in successfully');

      const emailLowerCase = email.toLowerCase();

      if (emailLowerCase === 'ambulanceadmin@gmail.com') {
        navigation.navigate('AmbulansAdmin');
      } else if (emailLowerCase === 'fireadmin@gmail.com') {
        navigation.navigate('FireAdmin');
      } else if (emailLowerCase === 'policeadmin@gmail.com') {
        navigation.navigate('PoliceAdmin');
      } else {
        firebase.firestore().collection('users').doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              navigation.navigate('Vehicle');
              console.log('User type: Vehicle');
            } else {
              firebase.firestore().collection('ambulance').doc(user.uid).get()
                .then((doc) => {
                  if (doc.exists) {
                    navigation.navigate('manager');
                    console.log('User type: Ambulance');
                  } else {
                    firebase.firestore().collection('fire').doc(user.uid).get()
                      .then((doc) => {
                        if (doc.exists) {
                          navigation.navigate('manager');
                          console.log('User type: Fire');
                        } else {
                          firebase.firestore().collection('police').doc(user.uid).get()
                            .then((doc) => {
                              if (doc.exists) {
                                navigation.navigate('manager');
                                console.log('User type: Police');
                              } else {
                                console.log('User type not found');
                              }
                            })
                            .catch((error) => {
                              console.log('An error occurred:', error.message);
                            });
                        }
                      })
                      .catch((error) => {
                        console.log('An error occurred:', error.message);
                      });
                  }
                })
                .catch((error) => {
                  console.log('An error occurred:', error.message);
                });
            }
          })
          .catch((error) => {
            console.log('An error occurred:', error.message);
          });
      }
    })
    .catch((error) => {
      console.log('An error occurred:', error.message);
    });
};


useEffect(() => {
if (navigation.isFocused()) {
setModalVisible(true);
}
}, [navigation]);
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', paddingTop: 20, paddingBottom: 20, backgroundColor: 'red', marginBottom: 30 }}>
        <Image source={require('./../image/user.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10, color: 'white' }}>EMERGENCY ENTRY</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"

      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button color="red" title="Login" onPress={handleLogin} />
      <Button color="red" title="Don't have an account? Sign up (RegisterScreen)" onPress={() => navigation.navigate('Manager')} /> 
       <NavigationContainer>
      {modalVisible && (
        <View>
          <FirstInstruction
            onCancel={onCancel}
            onConfirm={handleConfirm} />
        </View>
      )}
    </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,

  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    marginLeft: 30,


  },
});
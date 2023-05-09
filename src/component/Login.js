import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import firebase from 'firebase/app';
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
firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
const { user } = userCredential;
console.log('User logged in successfully');

firebase.firestore().collection('users').doc(user.uid).get()
  .then((doc) => {
    if (doc.exists) {
      //prop.navigation.navigate('Station');
      console.log("yazz");
    } else {
      firebase.firestore().collection('ambulance').doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            navigation.navigate('Ambulancemain');
          } else {
            firebase.firestore().collection('fire').doc(user.uid).get()
              .then((doc) => {
                if (doc.exists) {
                  navigation.navigate('Firemain');
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
})
.catch(error => console.log('An error occurred:', error.message));
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
      <Button color="red" title="Don't have an account? Sign up" onPress={() => navigation.navigate('RegisterScreen')} />
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
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth, firestore, database } from '../../node_modules/expo/AppEntry';
export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Kullanıcının kimliğini alma
        const { user } = userCredential;
        if (user != null) {
          console.log('User account created successfully');

          // Kullanıcının adını ve soyadını güncelleme
          user.updateProfile({
            displayName: `${name} ${surname}`
          }).then(() => {
            console.log('User display name updated successfully');
            navigation.navigate('Login');
          }).catch((error) => console.log('An error occurred while updating user display name:', error.message));
        }
      })
      .catch(error => console.log('An error occurred while creating user account:', error.message));
     
  }

  return (
    <View style={styles.container}>
       <View style={{ alignItems: 'center', paddingTop: 20,paddingBottom:20, backgroundColor:'red', marginBottom:30 }}>
    <Image source={require('./../image/user.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 , color:'white',paddingLeft: 100, paddingRight: 100,}}>REGISTER</Text>
  </View>
      <TextInput
        style={styles.input}
        placeholder="Ad"
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Soyad"
        onChangeText={setSurname}
        value={surname}
        autoCapitalize="words"
      />
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
      <Button style={styles.button} color="red" title="Kaydol" onPress={handleRegister} />
      <View style={{ marginTop: 10 }} /> 
      <Button style={styles.button} color="red" title="Zaten hesabım var, giriş yap" onPress={() => navigation.navigate('Vehicle')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
 
});

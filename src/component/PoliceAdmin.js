import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('06 ABC 000');

  const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const generateEmail = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    return `ambulance${randomNumber}@gmail.com`;
  };

  const handleRegister = () => {
    const generatedEmail = generateEmail();
    const generatedPassword = generatePassword();
    const formattedPhone = phone.replace(/\D/g, ''); // Sadece rakamları alır
    const formattedPhoneLength = formattedPhone.length;
  
    if (formattedPhoneLength !== 10) {
      Alert.alert('Hata', 'Lütfen geçerli bir telefon numarası girin.');
      return;
    }
    const plateRegex = /^\d{2}\s[A-Z]{3}\s\d{3}$/; // Geçerli plaka formatı için bir regex

if (!plateRegex.test(plate)) {
  alert('Hata', 'Lütfen geçerli bir plaka girin. Örnek: 06 ABC 123');
  return;
}



    firebase.auth()
      .createUserWithEmailAndPassword(generatedEmail, generatedPassword)
      .then((userCredential) => {
        const { user } = userCredential;
        if (user) {
          console.log('User account created successfully');
          user.updateProfile({
            displayName: `${name} ${surname}`
          }).then(() => {
            console.log('User display name updated successfully');
            firebase.firestore().collection('ambulance').doc(user.uid).set({
              plate,
              name,
              surname,
              email: generatedEmail,
              password:generatedPassword,
              phone
            })
            .then(() => {
              console.log('User data saved successfully');
              Alert.alert(
                'Kayıt Başarılı',
                `Mail: ${generatedEmail}\nŞifre: ${generatedPassword}`,
                [
                  { text: 'Tamam', onPress: () => navigation.navigate('Login') }
                ]
              );
            })
            .catch((error) =>
              console.log('An error occurred while saving user data:', error.message)
            );
          })
          .catch((error) =>
            console.log('An error occurred while updating user display name:', error.message)
          );
        }
      })
      .catch((error) => console.log('An error occurred while creating user account:', error.message));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: 'red',
          marginBottom: 30,
          borderRadius: 3
        }}
      >
        <Image source={require('./../image/user.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10, color: 'white', paddingLeft: 100, paddingRight: 100 }}>REGISTER</Text>
      </View>

      <TextInput
      style={styles.input}
      placeholder="06 ABC 1234"
      onChangeText={setPlate}
      autoCapitalize="characters"
    />
      <TextInput
        style={styles.input}
        placeholder="Ambulance driver name"
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Ambulance driver surname"
        onChangeText={setSurname}
        value={surname}
        autoCapitalize="words"
      />
       <TextInput
      style={styles.input}
      placeholder="(XXX) XXX XXXX"
      onChangeText={setPhone}
      value={phone}
      keyboardType="phone-pad"
    />
      <Button style={styles.button} color="red" title="Kaydol" onPress={handleRegister} />
      <View style={{ marginTop: 10 }} />
      <Button style={styles.button} color="red" title="Zaten hesabım var, giriş yap" onPress={() => navigation.navigate('login')} />
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

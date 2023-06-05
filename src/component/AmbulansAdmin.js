import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert,TouchableOpacity, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [plate, setPlate] = useState('06 ABC 000');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('false');
  const collection = "ambulance";
  
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
      Alert.alert('Hata', 'Lütfen geçerli bir plaka girin. Örnek: 06 ABC 123');
      return;
    }

    firebase.auth()
      .createUserWithEmailAndPassword(generatedEmail, generatedPassword)
      .then((userCredential) => {
        const { user } = userCredential;
        if (user) {
          setUserId(user.uid); // Kullanıcının ID'sini ayarla
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
              password: generatedPassword,
              phone,
              Id: user.uid,
              status,
              collection,
              
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
          paddingTop: 0,
          paddingBottom: 10,
          backgroundColor: 'red',
          marginBottom: 30,
          borderRadius: 30,
          width:'100%'
        }}
      >
        <Image source={require('./../image/user.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10, color: 'white'}}>AMBULANCE OFFICER</Text>
      </View>
      <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf:'flex-start',marginLeft:35,marginBottom:5}}>License Plate</Text>
      <TextInput
      style={styles.input}
      placeholder="06 ABC 123"
      onChangeText={setPlate}
      autoCapitalize="characters"
      placeholderTextColor="#fff"
      />
      <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf:'flex-start',marginLeft:35,marginBottom:5}}>Driver Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Ahmet"
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
        placeholderTextColor="#fff"
      />
      <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf:'flex-start',marginLeft:35,marginBottom:5}}>Driver Surname</Text>
      <TextInput
        style={styles.input}
        placeholder="Yılmaz"
        onChangeText={setSurname}
        value={surname}
        autoCapitalize="words"
        placeholderTextColor="#fff"
      />
      <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf:'flex-start',marginLeft:35,marginBottom:5}}>Driver Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Ankara/Yenimahalle"
        onChangeText={setAddress}
        value={address}
        autoCapitalize="words"
        placeholderTextColor="#fff"
      />
      <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf:'flex-start',marginLeft:35,marginBottom:5}}>Driver Phone Number</Text>
      <TextInput
      style={styles.input}
      placeholder="(XXX) XXX XXXX"
      onChangeText={setPhone}
      value={phone}
      keyboardType="phone-pad"
      placeholderTextColor="#fff"
      />
      <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
        <Text style={styles.registerBtnText}>Register Officer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>
          GO BACK TO{" "}
          <Text style={styles.register2Text}>LOGIN PAGE</Text>{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height:'100%',
    padding: 20,
    paddingBottom:50
  },
  
  input: {
    width: '80%',
    height: 45,
    borderWidth: 1,
    backgroundColor: "#4B4453",
    borderColor: 'black',
    marginBottom: 10,
    padding: 10,
    borderRadius: 17,
    color:'#fff'
  },
  registerBtn: {
    width: "65%",
    backgroundColor: "red",
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop:10
  },

  registerBtnText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 15,
  },

  register2Text: {
    fontSize: 17,
    fontWeight: "bold",
    color: "red",
  },
 
});

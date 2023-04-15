
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image} from 'react-native';
import firebase from 'firebase/app';
export default function LoginScreen({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
  // Kullanıcının kimliğini alma
  const { user } = userCredential;

  console.log('User logged in successfully');

  
  if (email === 'admin@gmail.com' && password === 'admin123') {
    navigation.navigate('Adminmain');
  } else {
    navigation.navigate('Vehicle');
  }
})
.catch(error => console.log('An error occurred:', error.message));
}

return (
  <View style={{ flex: 1 }}>
  <View style={{ alignItems: 'center', paddingTop: 20,paddingBottom:20,backgroundColor:'red',marginBottom:30 }}>
    <Image source={require('./../image/user.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 , color:'white'}}>EMERGENCY ENTRY</Text>
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
<Button color= "red" title="Login" onPress={handleLogin} />
<Button color= "red" title="Don't have an account? Sign up" onPress={() => navigation.navigate('Vehicle')} />
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
marginLeft :30,


},
});
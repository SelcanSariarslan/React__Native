import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const TextArea = () => {
  const [inputName, setInputName] = useState('');

  const addUserToFirestore = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      await firebase.firestore().collection('users').doc(uid).update({
        detail: inputName,
      });
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
        placeholder=" Can you explain the event?"
      />
      <Button color= "red" title="Save" onPress={addUserToFirestore} />
    </View>
  );
};

export default TextArea;

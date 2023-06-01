import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "firebase/app";
import "firebase/auth";
import { auth, firestore, database } from "../../node_modules/expo/AppEntry";
export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userId, setUserId] = useState("");

  const [userType, setUserType] = useState("user"); // default value is 'user'

  const handleRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        if (user != null) {
          console.log("User account created successfully");
          user
            .updateProfile({
              displayName: `${name} ${surname}`,
            })
            .then(() => {
              console.log("User display name updated successfully");
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .set({
                  name,
                  surname,
                  email,
                  password,
                })
                .then(() => {
                  console.log("User data saved successfully");
                  navigation.navigate("Login");
                })
                .catch((error) =>
                  console.log(
                    "An error occurred while saving user data:",
                    error.message
                  )
                );
            })
            .catch((error) =>
              console.log(
                "An error occurred while updating user display name:",
                error.message
              )
            );
        }
      })
      .catch((error) =>
        console.log(
          "An error occurred while creating user account:",
          error.message
        )
      );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          paddingTop: 10,
          paddingBottom: 20,
          backgroundColor: "red",
          marginBottom: 15,
          borderRadius: 3,
          width: "100%",
          borderBottomRightRadius: 60,
        }}
      >
        <Image
          source={require("./../image/user.png")}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 10,
            color: "white",
          }}
        >
          EMERGENCY REGISTER
        </Text>
      </View>
      <View style={{ marginTop: 15}} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        onChangeText={setSurname}
        value={surname}
        autoCapitalize="words"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholderTextColor="#fff"
      />
      <View style={{ marginTop: 20 }} />
      <TouchableOpacity onPress={handleRegister} style={styles.signupBtn}>
        <Text style={styles.signupBtnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("AmbulansAdmin")}>
        <Text style={styles.accountText}>
          I already have an account,{" "}
          <Text style={styles.signupText}>Sign In</Text>{" "}
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 50, width: '100%', height:'100%', backgroundColor:"red", borderTopLeftRadius:60,}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  input: {
    width: "75%",
    height: 50,
    backgroundColor: "#3b3945",
    color: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    paddingLeft: 30,
  },

  signupBtn: {
    width: "75%",
    backgroundColor: "red",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  signupBtnText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  accountText: {
    fontSize: 18,
  },

  signupText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

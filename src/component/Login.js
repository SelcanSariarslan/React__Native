import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import firebase from "firebase/app";
import Station from "./Station";
import "firebase/firestore";
import FirstInstruction from "../instructions/Instruction";
import { NavigationContainer } from "@react-navigation/native";
import Manager from "./../managerComponent/manager";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [userId, setUserId] = useState("");

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
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log("User logged in successfully");

        const emailLowerCase = email.toLowerCase();

        if (emailLowerCase === "ambulanceadmin@gmail.com") {
          navigation.navigate("AmbulansAdmin");
        } else if (emailLowerCase === "fireadmin@gmail.com") {
          navigation.navigate("FireAdmin");
        } else if (emailLowerCase === "policeadmin@gmail.com") {
          navigation.navigate("PoliceAdmin");
        } else {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              console.log("ccccccccccc");
              console.log(user.uid);
              if (doc.exists) {
                navigation.navigate("Vehicle");
                console.log("User type: Vehicle");
              } else {
                firebase
                  .firestore()
                  .collection("ambulance")
                  .doc(user.uid)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      navigation.navigate("Manager");
                      console.log("User type: Ambulance");
                    } else {
                      firebase
                        .firestore()
                        .collection("fire")
                        .doc(user.uid)
                        .get()
                        .then((doc) => {
                          if (doc.exists) {
                            navigation.navigate("Manager");
                            console.log("User type: Fire");
                          } else {
                            firebase
                              .firestore()
                              .collection("police")
                              .doc(user.uid)
                              .get()
                              .then((doc) => {
                                if (doc.exists) {
                                  navigation.navigate("Manager");
                                  console.log("User type: Police");
                                } else {
                                  console.log("User type not found");
                                }
                              })
                              .catch((error) => {
                                console.log(
                                  "An error occurred:",
                                  error.message
                                );
                              });
                          }
                        })
                        .catch((error) => {
                          console.log("An error occurred:", error.message);
                        });
                    }
                  })
                  .catch((error) => {
                    console.log("An error occurred:", error.message);
                  });
              }
            })
            .catch((error) => {
              console.log("An error occurred:", error.message);
            });
        }
      })
      .catch((error) => {
        console.log("An error occurred:", error.message);
      });
  };

  useEffect(() => {
    if (navigation.isFocused()) {
      setModalVisible(true);
    }
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: "red",
          marginBottom: 40,
          marginTop: 50,
          borderBottomLeftRadius: 60,
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
          EMERGENCY LOGIN
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.container}>
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

          <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.accountText}>
              Don't have an account?{" "}
              <Text style={styles.signupText}>Sign up</Text>{" "}
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 40, width: '90%', borderWidth:3, borderColor:"red"}} />
        </View>
      
      </View>
      <NavigationContainer>
        {modalVisible && (
          <View>
            <FirstInstruction onCancel={onCancel} onConfirm={handleConfirm} />
          </View>
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#3b3945",
    color: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 30,
  },

  loginBtn: {
    width: "80%",
    backgroundColor: "red",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
  },

  loginText: {
    color: "white",
    fontSize: 18,
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

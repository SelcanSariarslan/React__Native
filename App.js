import React from 'react';
import { StackNavigator } from 'react-navigation';
//import * as firebase from 'firebase';
import { StyleSheet, View, Text } from 'react-native';
import Login from './src/component/Login';
import Home from './src/component/Home';
import Vehicle from './src/component/Araçlar';
import Station from './src/component/Station';
import Manager from './src/managerComponent/manager';
import Caller from './src/managerComponent/Caller';
import Map from './src/component/Map';
import RegisterScreen from './src/component/RegisterScreen';
import AmbulansAdmin from './src/component/AmbulansAdmin';
import PoliceAdmin from './src/component/PoliceAdmin';
import FireAdmin from './src/component/FireAdmin';
//import CameraScreen from'./component/CameraScreen';
import Adminmain from './src/component/Adminmain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainContianer from './navigation/mainContainer';
import managerCotainer from './navigation/managerContainer'
/*var config = {
    apiKey: "AIzaSyCP3foqdkk2hd_3qAyc6-_FyPchcVeT70M",
    authDomain: "graduation-app-41c23.firebaseapp.com",
    databaseURL: "https://graduation-app-41c23.firebaseio.com",
    projectId: "graduation-app-41c23",
    storageBucket: "graduation-app-41c23.appspot.com",
    messagingSenderId: "366943644461",
    appId: "1:366943644461:web:862a205cf7794490b4c1a4",
    measurementId: "G-NK1XHHN5QN"
  };
  firebase.initializeApp(config);*/

const MainNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTintColor: 'red',
    },
  },
  Caller: {
    screen: Caller,
    navigationOptions: {
      headerTintColor: 'red',
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      headerTintColor: 'red',
    },
  },
  AmbulansAdmin: {
    screen: AmbulansAdmin,
    navigationOptions: {
      headerTintColor: 'red',
    },
  },
  PoliceAdmin: {
    screen: PoliceAdmin,
    navigationOptions: {
      headerTintColor: 'red',
    },
  },
  FireAdmin: {
    screen: FireAdmin,
    navigationOptions: {
      headerTintColor: 'red',
    },
  },
  Vehicle: {
    screen: MainContianer,
    navigationOptions: {
      headerShown: false, // hide header
    },
  },
  Station: {
    screen: Station,
    navigationOptions: {
      headerShown: false, // hide header
    },
  },
  Map: { screen: Map },
  Adminmain: {
    screen: Adminmain,
    navigationOptions: {
      headerShown: false, // hide header
    },
  }, Manager: {
    screen: managerCotainer,
    navigationOptions: {
      headerTintColor: 'red',
    },
  },
 
  
});

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;

import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert, Modal, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ConfirmationModal from '../smalComponent/ConfirmationModal';
import HelpModel from '../smalComponent/HelpModel';
import FirstInstruction from '../instructions/Instruction';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './Login';
import { NavigationContainer } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    width: '100%',
    height: '20%',
    marginTop:50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    height: '85%',
    padding: 10,
    backgroundColor: 'red',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
    paddingLeft: 75,
  },
  imageStyle: {
    borderColor: 'red',
    width: 90,
    height: 90,
  },
  textstyle: {
    color: 'white',
    paddingLeft: 30,
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '',
  }
  , rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'nowrap',
  },
  redView: {
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: '',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  containerRed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'red',
    backgroundColor: 'red',
    borderBottomLeftRadius: 45,
    borderTopLeftRadius: 45,
  },
  containerBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'blue',
    backgroundColor: 'blue',
    borderBottomLeftRadius: 45,
    borderTopLeftRadius: 45,
  },
  containerOr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#FF6000',
    backgroundColor: '#FF6000',
    borderBottomLeftRadius: 45,
    borderTopLeftRadius: 45,
  },
  textContainer: {
    flex: 1,
  },

  imageContainer: {
    marginLeft: 10,
  },
});


const { width, height } = Dimensions.get('window');
export default function Vehicle(props) {

  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate(LoginScreen);
    // props.navigation.navigate('LoginScreen');
  };
  const [stateHelp, setstateHelp] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Vehicle, setVehicle] = useState("");

  const handlePressForVehicle = (name) => {
    setModalVisible(true);
    setVehicle(name);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleConfirm = (name) => {
    navigateToPage(name);
    console.log(name);
    setModalVisible(false);
  };

  const handleDetails = () => {
    setstateHelp(false);

  };
  const cancelShow = () => {
    setstateHelp(false);

  };



  const navigateToPage = (vehicleName) => {
    const name = vehicleName ? vehicleName : '';
    props.navigation.navigate('Station', { vehicleName: name });

  }


  const handlePressTrue = () => {
    setstateHelp(true);
  }
  const handlePressFalse = () => {
    setstateHelp(false);
  }



  const navigateToAnotherPage = () => {
    // navigate to another page here
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingTop: 30}}></View>
      <View>
        <ConfirmationModal
          visible={modalVisible}
          name={Vehicle}
          onCancel={handleCancel}
          onConfirm={() => handleConfirm(Vehicle)}
        />
      </View>

      <TouchableOpacity
        onPress={handlePressTrue}
        style={{
          backgroundColor: '',
          width: 100,
          height: 100,
          position: 'absolute',
          top: 5,
          left: 5,
          zIndex: 1,
        }}
      >
        <Image
          source={require('./../image/questıonmark.webp')}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: 30,
            left: 5,
            backgroundColor: 'white',
            borderRadius: 20,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 30,
            left: 29,
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 30,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'red', fontSize: 21, fontWeight:'bold', marginLeft:5 }}>Help</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'Yes',
                onPress: () => handleLogout(),
              }
            ]
          )
        }}

        style={{
          backgroundColor: '',
          width: 120,
          height: 100,
          position: 'absolute',
          top: 5,
          right: 5,
          zIndex: 1,
        }}
      >
       
        
      </TouchableOpacity>
      
      {stateHelp && (
        <View>
          <HelpModel
            onCancel={handlePressFalse}
            onDetails={handleDetails}
            oncancelShow={cancelShow} />

        </View>
      )}




      <View style={styles.border}>
        <Text style={styles.text}>EMERGENCY{'\n'}   SERVICES</Text>
      </View>
      <View style={{ paddingTop: 20 }}></View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 35, fontWeight: 'bold'}}>Please select a service</Text>
        <View style={{ marginTop: 5, width: '95%', borderWidth:2, borderColor:"red"}} />
      </View>
      <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handlePressForVehicle('Ambulans')} style={styles.containerRed}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>AMBULANCE</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/hospital.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePressForVehicle('Police')} style={styles.containerBlue}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>POLICE</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/police-station.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePressForVehicle('FIRE FIGHTING')} style={styles.containerOr}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>FIRE-FIGHTING</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/fire-station.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>
      </View>

          

    </View >
  );

}

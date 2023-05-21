import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert, Modal, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ConfirmationModal from '../smalComponent/ConfirmationModal';
import HelpModel from '../smalComponent/HelpModel';
import FirstInstruction from '../instructions/Instruction';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './Map';
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
    height: '30%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 10,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'red',
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
    paddingLeft: 25,
  },
  imageStyle: {
    borderColor: 'red',
    width: 90,
    height: 90,
  },
  textstyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: ''
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'red',
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
    props.navigation.navigate('Login');
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
      <View style={{ paddingTop: 30, backgroundColor: 'red' }}></View>
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
          <Text style={{ color: 'white', fontSize: 19 }}>Help</Text>
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
          width: 50,
          height: 50,
          position: 'absolute',
          top: 5,
          right: 5,
          zIndex: 1,
        }}
      >
        <Image
          source={require('./../image/out.png')}
          style={{
            width: 35,
            height: 35,
            position: 'absolute',
            top: 30,
            left: 7.5,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: 'white',
            backgroundColor: 'white',
          }}
        />
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
        <Text style={styles.text}>EMERGENCY{'\n'}   VEHICLES</Text>
      </View>
      <View style={{ paddingTop: 20 }}></View>
      <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Please select a vehicle</Text>
      </View>
      <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handlePressForVehicle('Ambulans')} style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>AMBULANCE</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/ampu.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePressForVehicle('Police')} style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>POLICE</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/polic.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePressForVehicle('FIRE FIGHTING')} style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>FIRE-FIGHTING</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/itfa.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>
      </View>

    </View >
  );

}

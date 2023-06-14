import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert, Modal, Button, ImageBackground } from 'react-native';
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
    height: '31%',
    marginTop:50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    height: '85%',
    padding: 10,
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
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: '',
    alignSelf:'center'
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
  containerAmbulance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    height:'88%',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 15,
  },
  containerPolice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    height:'88%',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 15,
  },
  containerFire: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    height:'88%',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 15,
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
      <View style={{ paddingTop: 10}}></View>
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
      <ImageBackground
        source={require('./../image/mainPage.jpeg')}
        style={{flex:1,height:'100%',marginTop:10,borderRadius: 40,width:'100%'}}
        imageStyle={{ borderRadius: 15}}
        >
        <View style={{width:320}}></View>
        </ImageBackground>
      </View>
      
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#3b3945', fontSize: 35, fontWeight: 'bold'}}>Please Select a Service</Text>
        <View style={{ marginTop: 5, width: '95%', borderWidth:2, borderColor:"#3b3945"}} />
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
        
        <ImageBackground
        source={require('./../image/ambulancebg.jpg')}
        style={{flex:1,height:'88%',marginTop:10,borderRadius: 40,}}
        imageStyle={{ borderRadius: 15}}
        >
        <TouchableOpacity onPress={() => handlePressForVehicle('Ambulans')} style={styles.containerAmbulance}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>AMBULANCE</Text>
          </View>
        </TouchableOpacity>
        </ImageBackground>
        
        <ImageBackground
        source={require('./../image/policebg.jpg')}
        style={{flex:1,height:'88%',marginTop:5,borderRadius: 40,}}
        imageStyle={{ borderRadius: 15}}
        >
        <TouchableOpacity onPress={() => handlePressForVehicle('Police')} style={styles.containerPolice}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>POLICE</Text>
          </View>
        </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
        source={require('./../image/firebg.jpg')}
        style={{flex:1,height:'88%',marginTop:5,borderRadius: 40,}}
        imageStyle={{ borderRadius: 15}}
        >
        <TouchableOpacity onPress={() => handlePressForVehicle('FIRE FIGHTING')} style={styles.containerFire}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>FIRE-FIGHTING</Text>
          </View>
        </TouchableOpacity>
        </ImageBackground>
      </View>

          

    </View >
  );

}

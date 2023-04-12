import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ConfirmationModal from '../smalComponent/ConfirmationModal';
import HelpModel from '../smalComponent/HelpModel';
import FirstInstruction from '../instructions/Instruction';


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
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'red',
    fontSize: 50,
    color: 'white',
    fontWeight: '800',
  },
  imageStyle: {
    borderColor: 'red',
    width: 90,
    height: 90,
  },
  textstyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 40,
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
    <View style={{paddingTop:30,backgroundColor:'red'}}></View>
      <View >

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
            zIndex: 1,
            backgroundColor: 'white',
            borderRadius: 20,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 30,  // adjust the top position to align with the image
            left: 29,  // adjust the left position to add some space between the text and image
            zIndex: 1,
            alignItems: 'center',  // center the text horizontally
            justifyContent: 'center',  // center the text vertically
            width: 60,  // adjust the width to fit the text
            height: 30,  // adjust the height to fit the text
          }}
        >
          <Text style={{ color: 'white' }}>Yardım</Text>
        </View>
      </TouchableOpacity>

      {stateHelp && (
        <View>
          <HelpModel
            onCancel={handlePressFalse}
            onDetails={ handleDetails}
            oncancelShow={cancelShow} />
            
        </View>
      )}




      <View style={styles.border}>
        <Text style={styles.text}>ACİL ARAÇLAR</Text>
      </View>
      <View style={{ paddingTop: 20 }}></View>
      <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Lütfen bir arac seçiniz</Text>
      </View>
      <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handlePressForVehicle('Ambulans')} style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>AMBULANS</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/ampu.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePressForVehicle('Polis')} style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>POLİS</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/polic.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePressForVehicle('İtfaiye')} style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>ITFAIYE</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./../image/itfa.png')} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>
      </View>

    </View >
  );

}

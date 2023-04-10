import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';




const ConfirmationModal = ({ visible, name, onCancel, onConfirm }) => {

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, width: 350, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
          <Image source={require('./../image/ok.jpg')} style={{ width: 250, height: 100 }} />
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: 'red' }}>
            İstediğiniz Araç
          </Text>
          <Text style={{  textAlign: 'center', marginTop: 20, color: 'red', fontSize: 40,fontWeight:'bold'  }}>
            {'"'+name+'"'}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ fontSize: 18, color: 'red', paddingRight: 230, fontSize: 20,fontWeight:'bold' }}>Hayır</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ fontSize: 18, color: 'green', fontSize: 20,fontWeight:'bold' }}>Evet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



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
    borderRadius: 20,
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



  const navigateToPage = (vehicleName) => {
    const name = vehicleName ? vehicleName : '';
    props.navigation.navigate('Station', { vehicleName: name });

  }



  const handlePressForVehichle = (name) => {
    Alert.alert(
      'ACİL ARAÇ',
      ' İstediğiniz araç ' + '"' + name + '"',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => navigateToPage(name),
          style: 'default',
          image: (
            <Image
              source={require('./../image/ampu.png')}
              style={{ width: 40, height: 40 }}
            />
          ),
        },
      ]
    );
  };

  const handlePress = () => {
    Alert.alert(
      'Nasıl kullanılır!!!',
      'Are you sure you want to navigate to another page?Are you sure you want to navigate to another page?Are you sure you want to navigate to another page?Are you sure you want to navigate to another page?Are you sure you want to navigate to another page?',

      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => navigateToAnotherPage() },
      ],
      { titleStyle: { color: 'red' } }
    );
  };



  const navigateToAnotherPage = () => {
    // navigate to another page here
  };

  return (



    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View >

        <ConfirmationModal
          visible={modalVisible}
          name={Vehicle}
          onCancel={handleCancel}
          onConfirm={() => handleConfirm(Vehicle)}
        />
      </View>
      <TouchableOpacity
        onPress={handlePress}
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
            top: 5,
            left: 5,
            zIndex: 1,
            backgroundColor: 'white',
            borderRadius: 20,
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,  // adjust the top position to align with the image
            left: 29,  // adjust the left position to add some space between the text and image
            zIndex: 1,
            alignItems: 'center',  // center the text horizontally
            justifyContent: 'center',  // center the text vertically
            width: 60,  // adjust the width to fit the text
            height: 30,  // adjust the height to fit the text
          }}
        >
          <Text style={{ color: 'white' }}>Yardım</Text>
        </TouchableOpacity>
      </TouchableOpacity>






      <View style={styles.border}>
        <Text style={styles.text}>ACİL ARAÇLAR</Text>
      </View>
      <View style={{ paddingTop: 20 }}></View>
      <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Lütfen bir arac seçiniz</Text>
      </View>
      <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: '', flex: 1, justifyContent: 'center' }}>
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

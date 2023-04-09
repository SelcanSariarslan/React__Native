import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
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

export default class Vehicle extends React.Component {
  handleButtonPress = (vehicleName) => {
    const name = vehicleName ? vehicleName : '';
    //this.props.navigation.navigate('Station', { vehicleName: name });
    this.handlePressForVehichle(name);
  };

  navigateToPage = (name) =>{
    this.props.navigation.navigate('Station', { vehicleName: name });

  }

  handlePressForVehichle = (name) => {
    Alert.alert(
      'ACİL ARAÇ',
      ' İstediğiniz araç '+name,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.navigateToPage(name) },
      ]
    );
  };

  handlePress = () => {
    Alert.alert(
      'Alert Title',
      'Are you sure you want to navigate to another page?Are you sure you want to navigate to another page?Are you sure you want to navigate to another page?Are you sure you want to navigate to another page?Are you sure you want to navigate to another page?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => navigateToAnotherPage() },
      ]
    );
  };

  navigateToAnotherPage = () => {
    // navigate to another page here
  };


  render() {

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
       
          <TouchableOpacity onPress={this.handlePress} style={{width:30,height:30,position:'absolute',top:5,left:5,zIndex:1}}>
          <Image source={require('./../image/questıonmark.webp')} style={{width:30,height:30,position:'absolute',top:5,left:5,zIndex:1,backgroundColor:'white',borderRadius:20}} />
       
          </TouchableOpacity>

        
         <View style={styles.border}>
          <Text style={styles.text}>ACİL ARAÇLAR</Text>
        </View>
        <View style={{ paddingTop: 20 }}></View>
        <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Lütfen bir arac seçiniz</Text>
        </View>
        <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: '', flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.handleButtonPress('Ambulans')} style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.textstyle}>AMBULANS</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={require('./../image/ampu.png')} style={styles.imageStyle} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.handleButtonPress('Polis')} style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.textstyle}>POLİS</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={require('./../image/polic.png')} style={styles.imageStyle} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.handleButtonPress('İtfaiye')} style={styles.container}>
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
}

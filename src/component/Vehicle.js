import React from 'react';
import { StyleSheet,View,Text,Dimensions,TouchableOpacity,Image} from 'react-native';
import { NavigationActions } from 'react-navigation';
const styles = StyleSheet.create({
    imageStyle: {
      width: 150,
      height: 150,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: 'red',
      alignSelf:'center',
      marginTop: 20,
    },
  });
const{width,height}= Dimensions.get('window');

export default class Vehicle extends React.Component{
  handleFirstButtonPress = () => {
    this.props.navigation.navigate('Station');
  };
  handleSecondButtonPress = () => {
    this.props.navigation.navigate('Station');
  };
  handleThirdButtonPress = () => {
    this.props.navigation.navigate('Station');
  };

  render(){
    return (
      <View style={{flex:1}}>
        <TouchableOpacity onPress={this.handleFirstButtonPress}>
          <Image source={require('./../image/ambulance.jpg')} style={styles.imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSecondButtonPress}>
          <Image source={require('./../image/polis.jpg')} style={styles.imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleThirdButtonPress}>
          <Image source={require('./../image/itfaiye.jpg')} style={styles.imageStyle} />
        </TouchableOpacity>
      </View>
    );
  }
}
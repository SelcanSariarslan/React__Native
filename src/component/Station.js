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
    this.props.navigation.navigate('Map');
  };
  handleSecondButtonPress = () => {
    this.props.navigation.navigate('Map');
  };
  handleThirdButtonPress = () => {
    this.props.navigation.navigate('Map');
  };

  render(){
    return (
      <View style={{flex:1}}>
         <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold',}}>Select your urgency </Text>
         <Text style={{alignSelf: 'center', fontSize: 18,}}>(Red most urgent, green medium urgency, yellow less urgent)</Text>
        <TouchableOpacity onPress={this.handleFirstButtonPress}>
          <View style={{ width: 150, height: 150, backgroundColor: 'red' ,width: 150, borderRadius: 50, borderWidth: 2,borderColor: 'red',alignSelf:'center',marginTop: 20,}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSecondButtonPress}>
        <View style={{ width: 150, height: 150, backgroundColor: 'green' ,width: 150, borderRadius: 50, borderWidth: 2,borderColor: 'green',alignSelf:'center',marginTop: 20,}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleThirdButtonPress}>
        <View style={{ width: 150, height: 150, backgroundColor: 'yellow' ,width: 150, borderRadius: 50, borderWidth: 2,borderColor: 'yellow',alignSelf:'center',marginTop: 20,}} />
        </TouchableOpacity>
      </View>
    );
  }
}
import React from 'react';
import { StyleSheet,View,Text,Dimensions,TouchableOpacity,Image} from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
    imageStyle: {
      width: 150,
      height: 150,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: 'red',
      alignSelf:'center',
      marginTop: 20,
    },
    textstyle:{
      color:'red',
      alignSelf:'center',
      fontSize:20,
      fontWeight: 'bold',  
    },
});
  
const {width, height} = Dimensions.get('window');

export default class Vehicle extends React.Component {
  handleButtonPress = (vehicleName) => {
    const name = vehicleName ? vehicleName : '';
    this.props.navigation.navigate('Station', { vehicleName: name });
  };
  

  render() { 
    return (
      <View style={{flex:1,backgroundColor:''}}>
        <Text style={{fontSize:40,alignSelf:'center',color:'red',paddingTop:20,fontWeight:'800'}}>ACİL ARAÇLAR</Text>
        <TouchableOpacity onPress={() => this.handleButtonPress('Ambulans')}>
          <Image source={require('./../image/plus-5-xxl.png')} style={styles.imageStyle} />
        </TouchableOpacity>
        <Text style={styles.textstyle}>AMBULANS</Text>
        <TouchableOpacity onPress={() => this.handleButtonPress('Polis')}>
          <Image source={require('./../image/images.png')} style={styles.imageStyle} />
        </TouchableOpacity>
        <Text style={styles.textstyle}>POLİS</Text>
        <TouchableOpacity onPress={() => this.handleButtonPress('İtfaiye ')}>
          <Image source={require('./../image/firefighting.png')} style={styles.imageStyle} />
        </TouchableOpacity>
        <Text style={styles.textstyle}>ITFAIYE</Text>
      </View>
    );
  }
}

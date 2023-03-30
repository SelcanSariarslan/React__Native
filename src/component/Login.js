import React from 'react';
import { StyleSheet,View,Text,Dimensions,TouchableOpacity,Image} from 'react-native';
import { NavigationActions } from 'react-navigation';
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        button: {
          backgroundColor: 'red',
          padding: 20,
          borderRadius: 10,
          marginLeft:20,
          marginRight:20,
          marginTop: 30,
        },
        buttonText: {
          color: 'white',
          fontSize: 18,
        },
      });
  
const{width,height}= Dimensions.get('window');

export default class Login extends React.Component{
  handleFirstButtonPress = () => {
    this.props.navigation.navigate('Vehicle');
  };
  handleSecondButtonPress = () => {
    this.props.navigation.navigate('Adminmain');
  };
 

  render(){
    return (
      <View style={{flex:1}}>
        <TouchableOpacity style={styles.button} onPress={this.handleFirstButtonPress}>
        <Text style={styles.buttonText}>Kullanici Girişi</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.handleSecondButtonPress}>
        <Text style={styles.buttonText}>Admin Girişi</Text>
        </TouchableOpacity>
     
      </View>
    );
  }
}
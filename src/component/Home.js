/*import { authorize } from 'react-native-app-auth';
import  React from 'react';
import { NavigationActions } from 'react-navigation';
import { authorize } from 'react-native-app-auth';
import { Button, Text, View } from 'react-native';

const config = {
  issuer: 'https://giris.turkiye.gov.tr/cas2',
  clientId: 'your-client-id',
  redirectUrl: 'your-redirect-url',
  scopes: ['openid', 'profile', 'email', 'address'],
};

const App = () => {
  const login = async () => {
    try {
      const result = await authorize(config);
      console.log(result);
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <View>
      <Button title="Login with e-Devlet" onPress={login} />
    </View>
  );
};

export default Home;
/*import  React from 'react';
//import * as firebase from 'firebase';
import { StyleSheet,View,Text,Dimensions} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { WebView } from 'react-native-webview';
const{width,height}= Dimensions.get('window');

export default class Home extends React.Component{
   
    render(){
    
        return(
            
            <View style={{flex:1}}>
            <WebView
              //source={require( './../assets/Gptestnew.html' )}
              source={{ uri: 'https://www.google.com' }}
              javaScriptEnabled={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              />
          </View>
        );
            
        
    }
}*/

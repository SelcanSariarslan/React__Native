import * as React from 'react';
//import * as firebase from 'firebase';
import { StyleSheet,Text,View,Dimensions,TextInput,TouchableOpacity, ActivityIndicator,} from 'react-native';
import{ NavigationActions}from 'react-navigation';


const{width,height}= Dimensions.get('window');

export default class Login extends React.Component{
   state={
    mail:'',
    password:'',
    spinner:false,
   }
   componentDidMount(){
   /*firebase.auth().onAuthStateChanged(auth => {
    if(auth)
    {
      console.log('giriş başarılı');
      this.setState({spinner:true});
      this.goHome();
    }
   })*/ this.goHome();
   }
   goHome(){
    const navigateAction=NavigationActions.navigate({
      routeName:'Home'
    });
    this.props.navigation.dispatch(navigateAction);
   }
   login(email,password)
   {
   /*this.setState({spinner:true});
    firebase.auth().signInWithEmailAndPassword(email,password);*/
   }
    render(){
     
        return(
          
            <View style={{flex:1}}>
            <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Emergency App</Text>    
          </View>

         
         {this.state.spinner?
         <ActivityIndicator/>:
         <View>
         <TextInput style={{marginTop:25,width:width-20,marginLeft:10,marginRight:10,borderWidth:2,borderColor:'red',padding:10,borderRadius:25}}
         placeholder='E-mail address'
         //onChangeText={(mail) => this.setState({mail})}
         //autoCorrect={false}
         //value={this.state.mail}
         keyboardType='email-address'
         />
         <TextInput style={{marginTop:15,width:width-20,marginLeft:10,marginRight:10,borderWidth:2,borderColor:'red',padding:10,borderRadius:25}}
         placeholder='Password'
         //secureTextEntry={true}
         //onChangeText={(password) => this.setState({password})}
         //autoCorrect={false}
         value={this.state.password}
         
        />
        <TouchableOpacity onPress={() => this.login(this.state.email,this.state.password)}>
         <View style={{marginTop:15,width:width-20,marginLeft:10,marginRight:10,borderWidth:2,borderColor:'red',justifyContent:'center',alignItems:'center',padding:10,borderRadius:25}}>
             <Text style={{fontSize:25,fontWeight:'bold'}}>Giriş</Text>
         </View>
         </TouchableOpacity>
       </View>}
          </View>
        );
            
        
    }
}



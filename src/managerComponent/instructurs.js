import React from 'react';
import { View, Text } from 'react-native';

export const Manager = () => {
  return (
    <View style={{flex:1,padding:15}}>
      <Text style={{color:'#3b3945',fontSize:36,fontWeight:'bold',borderBottomWidth:2,alignSelf:'center'}}>Job Start Instruction</Text>
      <Text style={{color:'red',fontSize:24,fontWeight:'bold',marginTop:15}}>First:</Text>
      <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginTop:5}}>When your shift starts and you're ready for the job please click the 'get location' button to submit your location.</Text>
      <Text style={{color:'red',fontSize:24,fontWeight:'bold',marginTop:5}}>Second:</Text>
      <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginTop:5}}>After submitting your location, press the 'ready' button to update your mission status.</Text>
      <Text style={{color:'red',fontSize:24,fontWeight:'bold',marginTop:5}}>Third:</Text>
      <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginTop:5}}>Finally, press the 'recieve a service' button to receive a call and go to the task.</Text>
    </View>
  );
};

export default Manager;

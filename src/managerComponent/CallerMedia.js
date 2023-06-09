import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Button, Image} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const Manager = () => {

    const [callerData, setCallerData] = useState([]);
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const openModal1 = () => {
      setModal1Visible(true);
    };

    const closeModal1 = () => {
      setModal1Visible(false);
    };

    const openModal2 = () => {
      setModal2Visible(true);
    };

    const closeModal2 = () => {
      setModal2Visible(false);
    };
    
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    useEffect(() => {
      const fetchCallerData = async () => {
        try {
          if (user) {
            const userId = user.uid;
            
            const policeDoc = await db.collection('police').doc(userId).get();
            const ambulanceDoc = await db.collection('ambulance').doc(userId).get();
            const fireDoc = await db.collection('fire').doc(userId).get();
    
            const policeData = policeDoc.data();
            const ambulanceData = ambulanceDoc.data();
            const fireData = fireDoc.data();
    
            const combinedData = [policeData, ambulanceData, fireData].filter(data => data !== undefined);
    
            setCallerData(combinedData[0]);
            
           
           
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };
    
      // Change the interval value to 2000 for every 2 seconds
    
      fetchCallerData();

    
    
      
    }, []);//callerData
    console.log("All the data ");
    console.log(callerData);

  return (
    <View style={{flex:1,padding:15}}>
      <Text style={{color:'#3b3945',fontSize:36,fontWeight:'bold',borderBottomWidth:2,alignSelf:'center',marginBottom:15}}>Caller Informations</Text>
      <View style={{flexDirection:'row',marginBottom:10}}>
        <Text style={styles.label}>Caller Name: </Text>
        <Text style={styles.text}>{callerData.caller_name} {callerData.caller_surname}</Text>
      </View>
      <View style={{flexDirection:'row',marginBottom:10}}>
        <Text style={styles.label}>Caller Emergency Level: </Text>
        <Text style={styles.text}>{callerData.caller_emergencylevel}</Text>
      </View>
      <View style={{flexDirection:'row',marginBottom:30}}>
       
      </View>
      <TouchableOpacity onPress={openModal1} >
        <Text style={{width:'96%', color: 'white',backgroundColor:'green', fontSize: 25, fontWeight: 'bold', borderWidth:1.5, padding:10,borderRadius:10,alignSelf:'flex-start',textAlign:'center',marginBottom:15}}>CALLER MESSAGE</Text>
      </TouchableOpacity>
      
      <Modal visible={modal1Visible} animationType="none" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center',  backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
            <Text style={styles.label}>Caller Message</Text>
            <Text style={{fontSize:20,paddingBottom:20}}>{callerData.caller_message}</Text>
            <Button color="green" title="Close" onPress={closeModal1} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={openModal2} >
        <Text style={{width:'96%',color: 'white',backgroundColor:'green', fontSize: 25, fontWeight: 'bold', borderWidth:1.5, padding:10,borderRadius:10,alignSelf:'flex-start',textAlign:'center'}}>CALLER PHOTO</Text>
      </TouchableOpacity>
      <Modal visible={modal2Visible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center',  backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
            <Text style={styles.label}>Photo Sent By The Caller</Text>
            <Image source={{ uri: callerData.caller_image}} style={styles.image}/>
            <Button color="green" title="Close" onPress={closeModal2} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color:'darkgreen'
  },
  text: {
      fontSize: 20,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    marginBottom:15
},
});
export default Manager;

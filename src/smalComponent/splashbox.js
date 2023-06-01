import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

const ConfirmationModal = () => {
  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, width: '92%', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
          <Image source={require('./../image/ok.jpg')} style={{ width: 250, height: 100 }} />
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: 'red' }}>
          Wait for the service to accept, please be patient
          </Text>
          <Text style={{ textAlign: 'center', marginTop: 30, color: 'red', fontSize: 50, fontWeight: 'bold' }}>
           PAY ATTENTION
          </Text>

          {/* Splash Screen with ActivityIndicator */}
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator size={60} color="red" />
            <Text style={{ marginTop: 10, color: 'red' }}>waiting...</Text>
          </View>

          {/**<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 18, color: 'red', paddingRight: 230, fontSize: 20,fontWeight:'bold' }}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity >
              <Text style={{ fontSize: 18, color: 'green', fontSize: 20,fontWeight:'bold' }}>Yes</Text>
            </TouchableOpacity>
          </View> */}


        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';

const ConfirmationModal = ({ visible, name, onCancel, onConfirm }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, width: '92%', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 10, borderColor: 'red' }}>
          <Image source={require('./../image/ok.jpg')} style={{ width: 250, height: 100 }} />
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: 'red' }}>
            İstediğiniz Araç
          </Text>
          <Text style={{  textAlign: 'center', marginTop: 20, color: 'red', fontSize: 40,fontWeight:'bold'  }}>
            {'"'+name+'"'}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ fontSize: 18, color: 'red', paddingRight: 230, fontSize: 20,fontWeight:'bold' }}>Hayır</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ fontSize: 18, color: 'green', fontSize: 20,fontWeight:'bold' }}>Evet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

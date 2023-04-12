import React, { useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';

const ConfirmationModal = ({ visible, name, onCancel, onConfirm }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20 }}>
          <Image source={require('./path/to/your/image.png')} style={{ width: 100, height: 100 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
          EMERGENCY VEHICLE
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}>
            {'The vehicle you want ' + name}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ fontSize: 18, color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ fontSize: 18, color: 'green' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const MyComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressForVehicle = (name) => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = (name) => {
    setModalVisible(false);
    navigateToPage(name);
  };

  const navigateToPage = (name) => {
    // Navigate to the desired page based on the selected vehicle name
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => handlePressForVehicle('Car')}>
        <Text>Show confirmation dialog</Text>
      </TouchableOpacity>
      <ConfirmationModal
        visible={modalVisible}
        name="Car"
        onCancel={handleCancel}
        onConfirm={() => handleConfirm('Car')}
      />
    </View>
  );
};

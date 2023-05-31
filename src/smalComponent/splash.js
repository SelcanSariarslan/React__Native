import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const Splash = ({ visible, title, backgroundColor, textColor }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={[styles.modalContainer, { backgroundColor }]}>
        <View style={styles.contentContainer}>
          <ActivityIndicator size="large" color="red" />
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50%',
    width: '50%',
    
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Splash;

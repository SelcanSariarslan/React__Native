import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const Splash = ({ visible, title, backgroundColor, textColor }) => {
  if (!true) {
    return null; // Don't render the Splash component if it's not visible
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size={60} color="red" />
      <Text style={[styles.title, { color: "red" }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
});

export default Splash;

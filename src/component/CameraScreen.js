import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';

const CameraComponent = () => {
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
    }
  };

  const renderCamera = () => {
    return (
      <RNCamera
        ref={cameraRef}
        style={[styles.camera, styleProp]}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      />
    );
  };

  const renderImage = () => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {photo ? renderImage() : renderCamera()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

CameraComponent.propTypes = {
  prop: PropTypes.any,
  style: (props, propName, componentName) => {
    const style = props[propName];
    if (style) {
      const flattenedStyle = StyleSheet.flatten(style);
      const validKeys = ['width', 'height', 'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
      const invalidKeys = Object.keys(flattenedStyle).filter(key => !validKeys.includes(key));
      if (invalidKeys.length > 0) {
        return new Error(`Invalid style property \`${invalidKeys[0]}\` supplied to \`${componentName}\`. Use only valid style props.`);
      }
    }
  }
};

export default CameraComponent;

import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'red',
    alignSelf: 'center',
    marginTop: 20,
  },
});

const { width, height } = Dimensions.get('window');
console.log("test");

export default function Vehicle(props) {
  const { vehicleName } = props.route.params || "";

  const handleFirstButtonPress = () => {
    if (!vehicleName) {
      Alert.alert('Lütfen bir araç seçin!', '', [
        { text: 'Tamam', onPress: () => props.navigation.navigate('Vehicle') }
      ]);
      return;
    }
    console.log("Selected vehicle: ", vehicleName);
    props.navigation.navigate('Map', { vehiclename: vehicleName });
  };

  const handleSecondButtonPress = () => {
    if (!vehicleName) {
      Alert.alert('Lütfen bir araç seçin!', '', [
        { text: 'Tamam', onPress: () => props.navigation.navigate('Vehicle') }
      ]);
      return;
    }
    console.log("Selected vehicle: ", vehicleName);
    props.navigation.navigate('Map', { vehiclename: vehicleName });
  };

  const handleThirdButtonPress = () => {
    if (!vehicleName) {
      Alert.alert('Lütfen bir araç seçin!', '', [
        { text: 'Tamam', onPress: () => props.navigation.navigate('Vehicle') }
      ]);
      return;
    }
    console.log("Selected vehicle: ", vehicleName);
    props.navigation.navigate('Map', { vehiclename: vehicleName });
  };

  useEffect(() => {
    if (!vehicleName) {
      Alert.alert('Lütfen bir araç seçin!', '', [
        { text: 'Tamam', onPress: () => props.navigation.navigate('Vehicle') }
      ]);
    }
  }, [vehicleName]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'red', padding: 20 }}>
        <Text style={{ fontSize: 44, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
          İstediğiniz araç        "{vehicleName}"
        </Text>
      </View>
      <View style={{paddingTop:20}}></View>
      <View style={{ backgroundColor:'red',  justifyContent: 'center', alignItems: 'center', height: 50 ,borderRadius: 45}}>
  <Text style={{ color: 'white', fontSize: 28,fontWeight:'bold' }}>lütfen acil durum seviyesini seçin</Text>
</View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={handleFirstButtonPress}>
          <View style={{ width: 100, height: 100, backgroundColor: 'white', borderRadius: 55, borderWidth: 1, borderColor: 'red', alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
            <Image
              source={require('./../image/acil1.webp')}
              style={{ width: 80, height: 80, alignSelf: 'center' }}
            />
          </View>
          <Text style={{ alignSelf: 'center', fontSize: 30, color: 'black', fontWeight: 'bold' }}>Acil</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={handleSecondButtonPress}>
          <View style={{ width: 100, height: 100, backgroundColor: 'white', borderRadius: 55, borderWidth: 1, borderColor: 'green', alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
            <Image
              source={require('./../image/orta1.webp')}
              style={{ width: 80, height: 80, alignSelf: 'center' }}
            />
          </View>
          <Text style={{ alignSelf: 'center', fontSize: 30, color: 'black', fontWeight: 'bold' }}>Orta</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={handleThirdButtonPress}>
          <View style={{ width: 100, height: 100, backgroundColor: 'white', borderRadius: 55, borderWidth: 1, borderColor: '#FFD700', alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
            <Image
              source={require('./../image/normal1.webp')}
              style={{ width: 80, height: 80, alignSelf: 'center' }}
            />
          </View>
          <Text style={{ alignSelf: 'center', fontSize: 30, color: 'black', fontWeight: 'bold' }}>Normal</Text>

        </TouchableOpacity>
      </View>

    </View>
  );
}
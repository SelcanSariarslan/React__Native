import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DataPhotograph from '../smalComponent/DataPhotograph';
//import ImagePicker from 'react-native-image-picker';
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
/* if (!vehicleName) {
      Alert.alert('Lütfen bir araç seçin!', '', [
        { text: 'Tamam', onPress: () => props.navigation.navigate('Vehicle') }
      ]);
      return;
    }
    console.log("Selected vehicle: ", vehicleName);
    props.navigation.navigate('Map', { vehiclename: vehicleName }); */

export default function Vehicle(props) {
  const { vehicleName } = props.route.params || "";
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleFirstButtonPress = () => {
    setSelectedLevel("Acil");
  };

  const handleSecondButtonPress = () => {
    setSelectedLevel("Orta");
  };

  const handleThirdButtonPress = () => {
    setSelectedLevel("Normal");
  };

  useEffect(() => {
    if (!vehicleName) {
      Alert.alert('Lütfen bir araç seçin!', '', [
        { text: 'Tamam', onPress: () => props.navigation.navigate('Vehicle') }
      ]);
    }
  }, [vehicleName]);
  console.log(selectedLevel);
  return (
    <View style={{ flex: 1 }}>
    <View style={{paddingTop:30,backgroundColor:'red'}}></View>
      <View style={{ backgroundColor: 'red', padding: 20 }}>
        <Text style={{ fontSize: 44, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
          İstediğiniz araç        "{vehicleName}"
        </Text>
      </View>
      <View style={{ paddingTop: 20 }}></View>
      <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>lütfen acil durum seviyesini seçin</Text>
      </View>
      <View style={{ paddingTop: 20 }}></View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={handleFirstButtonPress} style={{ opacity: selectedLevel === "Acil" ? 1 : selectedLevel === "" ? 1 : 0.3 }} >
          <View style={{ borderWidth: 2, borderColor: 'red', borderRadius: 10 }}>
            <View style={{ width: 90, height: 90, borderRadius: 55, borderColor: 'red', alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
              <Image
                source={require('.././image/heart.webp')}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
              />
            </View>
            <Text style={{ alignSelf: 'center', fontSize: 25, color: 'red', fontWeight: 'bold' }}>Acil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSecondButtonPress} style={{ opacity: selectedLevel === "Orta" ? 1 : selectedLevel === "" ? 1 : 0.3 }} >
          <View style={{ borderWidth: 2, borderColor: 'red', borderRadius: 10 }}>
            <View style={{ width: 90, height: 90, borderRadius: 55, alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
              <Image
                source={require('.././image/heart.webp')}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
              />
            </View>
            <Text style={{ alignSelf: 'center', fontSize: 25, color: 'red', fontWeight: 'bold' }}>Orta</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleThirdButtonPress} style={{ opacity: selectedLevel === "Normal" ? 1 : selectedLevel === "" ? 1 : 0.3 }}>
          <View style={{ borderWidth: 2, borderColor: 'red', borderRadius: 10 }}>
            <View style={{ width: 90, height: 90, borderRadius: 55, borderColor: '#FFA500', alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
              <Image
                source={require('.././image/heart.webp')}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
              />
            </View>
            <Text style={{ alignSelf: 'center', fontSize: 25, color: 'red', fontWeight: 'bold' }}>Normal</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
      <Text>This is the Vehicle page</Text>
      <DataPhotograph />
    </View>

    </View>
  );
}
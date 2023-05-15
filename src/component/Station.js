import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Photograph from '../smalComponent/Photograph';
import Voice from '../smalComponent/Voice';
import { unique_intersection } from './ShortestPath';
import { useNavigation } from '@react-navigation/native';
//import ImagePicker from 'react-native-image-picker';
const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'red',
    alignSelf: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'flex-end',
    position: 'absolute',
    justifyContent: 'flex-start',
    marginTop: 540,
    paddingLeft: 300,
  },
  image: {
    width: 50,
    height: 50,
  },

  selectedNumber: {
    marginTop: 20,
  }, button: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
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
  const [showMenu, setShowMenu] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const navigation = useNavigation();


  const handleImagePress = () => {


    const randomNum = Math.floor(Math.random() * unique_intersection.length) + 1;
    setSelectedNumber(randomNum);
    console.log("the cordinates of: [" + selectedNumber + "]--> is: " + unique_intersection[randomNum]);



  };

  const handlePress = () => {
    const randomNum = selectedNumber;
    navigation.navigate('Map', { randomNum });
  };
  const handleOptionPress = (number) => {
    setSelectedNumber(number);
    setShowMenu(false);
  };

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
      Alert.alert('Please select a vehicle!', '', [
        { text: 'Tamam', onPress: () => props.navigation.navigate('Vehicle') }
      ]);
    }
  }, [vehicleName]);
  console.log(selectedLevel);
  return (
    selectedNumber,
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 30, backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'red', padding: 20 }}>
          <Text style={{ fontSize: 44, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            The vehicle you want "{vehicleName}"
          </Text>
        </View>
        <View style={{ paddingTop: 20 }}></View>
        <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Please select emergency level</Text>
        </View>
        <View style={{ paddingTop: 20 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={handleFirstButtonPress} style={{ opacity: selectedLevel === "Acil" ? 1 : selectedLevel === "" ? 1 : 0.3 }} >
            <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
              <View style={{ width: 90, height: 70, borderRadius: 55, borderColor: 'red', alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
                <Image
                  borderRadius={400}
                  style={{ width: 70, height: 70, alignSelf: 'center' }}
                  backgroundColor='red'
                />
              </View>
              <Text style={{ alignSelf: 'center', fontSize: 25, color: 'black', fontWeight: 'bold' }}>High</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSecondButtonPress} style={{ opacity: selectedLevel === "Orta" ? 1 : selectedLevel === "" ? 1 : 0.3 }} >
            <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
              <View style={{ width: 90, height: 70, borderRadius: 55, alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
                <Image
                  borderRadius={400}
                  style={{ width: 70, height: 70, alignSelf: 'center' }}
                  backgroundColor='#FFC900' />
              </View>
              <Text style={{ alignSelf: 'center', fontSize: 25, color: 'black', fontWeight: 'bold' }}>Middle</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleThirdButtonPress} style={{ opacity: selectedLevel === "Normal" ? 1 : selectedLevel === "" ? 1 : 0.3 }}>
            <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
              <View style={{ width: 90, height: 70, borderRadius: 55, borderColor: '#FFA500', alignSelf: 'flex-start', marginTop: 10, justifyContent: 'center' }}>
                <Image
                  borderRadius={400}
                  style={{ width: 70, height: 70, alignSelf: 'center' }}
                  backgroundColor='green' />
              </View>
              <Text style={{ alignSelf: 'center', fontSize: 25, color: 'black', fontWeight: 'bold' }}>Low</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {selectedNumber ? (
            <Text style={styles.selectedNumber}>
              {unique_intersection[selectedNumber]}
            </Text>
          ) : null}
          <TouchableOpacity onPress={handleImagePress}>
            <Image
              style={styles.image}
              source={require('../image/location.png')}
            />
          </TouchableOpacity>

        </View>

        <View style={{ marginTop: 10 }}>

          <Photograph />


        </View>

      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>CALL</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
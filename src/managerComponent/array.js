import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Array = () => {
  const [emergencyData, setEmergencyData] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  console.log(emergencyData);
  useEffect(() => {
    const db = firebase.firestore();

    const fetchData = async () => {
      try {
        const collectionRef = db.collection(collectionName);
        const querySnapshot = await collectionRef.get();
        const data = querySnapshot.docs.map((doc) => doc.data());
        setEmergencyData(data);
      } catch (error) {
        console.log(`Error getting ${collectionName} documents: `, error);
      }
    };

    fetchData();
  }, [collectionName]);

  const handleCollectionChange = (collection) => {
    setCollectionName(collection);
  };
  
  return (
    <ScrollView>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: 10 }}>Collection:</Text>
          <Text onPress={() => handleCollectionChange('police')} style={{ marginRight: 10, color: 'blue' }}>
            Police
          </Text>
          <Text onPress={() => handleCollectionChange('fire')} style={{ marginRight: 10, color: 'blue' }}>
            Fire
          </Text>
          <Text onPress={() => handleCollectionChange('ambulance')} style={{ color: 'blue' }}>
            Ambulance
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text>Emergency Data:</Text>
          {emergencyData.map((data, index) => (
            <View key={index}>
              <Text>{data.location}</Text>
              {index !== emergencyData.length - 1 && <View style={{ borderBottomWidth: 1, marginTop: 5 }} />}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Array;

//Kullanıcının tüm verilerii
/*import React, { useEffect, useState } from 'react';
import { View, Text,ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Array = () => {
  const [emergencyData, setEmergencyData] = useState([]);
  const [collectionName, setCollectionName] = useState('');

  useEffect(() => {
    const db = firebase.firestore();

    const fetchData = async () => {
      try {
        const collectionRef = db.collection(collectionName);
        const querySnapshot = await collectionRef.get();
        const data = querySnapshot.docs.map((doc) => doc.data());
        setEmergencyData(data);
      } catch (error) {
        console.log(`Error getting ${collectionName} documents: `, error);
      }
    };

    fetchData();
  }, [collectionName]);

  const handleCollectionChange = (collection) => {
    setCollectionName(collection);
  };

  return (
    <ScrollView>
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: 10 }}>Collection:</Text>
        <Text onPress={() => handleCollectionChange('police')} style={{ marginRight: 10, color: 'blue' }}>
          Police
        </Text>
        <Text onPress={() => handleCollectionChange('fire')} style={{ marginRight: 10, color: 'blue' }}>
          Fire
        </Text>
        <Text onPress={() => handleCollectionChange('ambulance')} style={{ color: 'blue' }}>
          Ambulance
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text>Emergency Data:</Text>
        {emergencyData.map((data, index) => (
          <View key={index}>
            <Text>{JSON.stringify(data)}</Text>
            {index !== emergencyData.length - 1 && <View style={{ borderBottomWidth: 1, marginTop: 5 }} />}
          </View>
        ))}
      </View>
     
    </View>
    </ScrollView>
  );
};

export default Array;*/

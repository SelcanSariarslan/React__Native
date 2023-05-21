import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const AllVehicle = (props) => {
    const [emergencyData, setEmergencyData] = useState([]); // all the data of the vehicles
    const [emergencyLocations, setEmergencyLocations] = useState([]); // just the location of the vehicles
    const [ClosestVehicle, setClosestVehicle] = useState("");
    const [ClosestVehicleId, setClosestVehicleId] = useState("");

    const callerLocation = props.caller_location;
    const collection = props.vehicle === 'Ambulans' ? 'ambulance': props.vehicle === 'Police'  ? 'police' : props.vehicle === 'FIRE FIGHTING'   ? 'fire' : '';


    useEffect(() => {
        const db = firebase.firestore();

        const fetchData = async () => {
            try {
                const collectionRef = db.collection(collection);
                const querySnapshot = await collectionRef.get();
                const data = querySnapshot.docs.map((doc) => doc.data());
                setEmergencyData(data);
                setEmergencyLocations(data.map(data => data.location));
            } catch (error) {
                console.log(`Error getting ${collection} documents: `, error);
            }
        };

        fetchData();
    }, [collection]);

    
    //handleCollectionChange(collection);
    console.log(callerLocation);
    console.log(emergencyLocations);

    return (
        
            <View>
               <Text>Select Collection</Text>
            </View>
     
    );
};

export default AllVehicle;

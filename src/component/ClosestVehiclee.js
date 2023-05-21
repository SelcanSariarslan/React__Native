import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const AllVehicle = (props) => {
    const [emergencyData, setEmergencyData] = useState([]); // all the data of the vehicles
    const [emergencyLocations, setEmergencyLocations] = useState([]); // just the location of the vehicles
    const [callerobject, setCallerobject] = useState([]);
    const [ClosestVehicle, setClosestVehicle] = useState("");
    const [targetVehicleId, setTargetVehicleId] = useState('');
    const [ClosestVehicleId, setClosestVehicleId] = useState("");

    const callerLocation = props.caller_location;
    const caller_id = props.user_Id;
    const collection = props.vehicle === 'Ambulans' ? 'ambulance' : props.vehicle === 'Police' ? 'police' : props.vehicle === 'FIRE FIGHTING' ? 'fire' : '';


    useEffect(() => {
        const db = firebase.firestore();  

        const fetchData = async () => {
            try {
                const collectionRef = db.collection(collection);
                const querySnapshot = await collectionRef.get();
                const data = querySnapshot.docs.map((doc) => doc.data());
                setEmergencyData(data);                                 // fetching all the data of the vehicle
                setEmergencyLocations(data.map(data => data.location)); // fetching all the locations of the vehicle
            } catch (error) {
                console.log(`Error getting ${collection} documents: `, error);
            }
        };

        fetchData();
    }, [collection]);



    useEffect(() => {
        const db = firebase.firestore();

        const fetchData = async () => {
            try {
                const collectionRef = db.collection("users");
                const querySnapshot = await collectionRef.where("Id", "==", caller_id).get(); // fetching the object that bellongs to the current user
                const data = querySnapshot.docs.map((doc) => doc.data());
                setCallerobject(data);

            } catch (error) {
                console.log(`Error getting ${"users"} documents: `, error);
            }
        };

        fetchData();
    }, ["users"]);

    useEffect(() => {
        const db = firebase.firestore();  // fetching the Id of the target vechile to send the media of the caller later

        const fetchData = async () => {
            try {
                const collectionRef = db.collection(collection);
                const querySnapshot = await collectionRef.where("location", "==", 461).get();
                const data = querySnapshot.docs.map((doc) => doc.data());
                setTargetVehicleId(data.map(data => data.Id));

            } catch (error) {
                console.log(`Error getting ${collection} documents: `, error);
            }
        };

        fetchData();
    }, [collection]);

    useEffect(() => {      // sending all the media to the target vechile
        const db = firebase.firestore();

        const fetchCallerData = async () => {
            try {
                const userQuerySnapshot = await db.collection('users').where('location', '==', callerLocation).get();
                const userIds = userQuerySnapshot.docs.map((doc) => doc.id);

                if (userIds.length > 0) {
                    const userId = userIds[0];

                    await db.collection(collection).doc(targetVehicleId[0]).update({
                        caller_id: userId,
                        caller_location: callerobject.map(data => data.location),
                        caller_image: callerobject.map(data => data.image),
                        coller_message: callerobject.map(data => data.detail),
                        coller_voice: callerobject.map(data => data.voiceUrl),
                        coller_emergencylevel: callerobject.map(data => data.emergency_level)
                    });


                } else {
                    console.log('No user found with location: 954');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchCallerData();
    }, []);


    //handleCollectionChange(collection);
    console.log(callerLocation);
    console.log(emergencyLocations);
    console.log("the full object");
    console.log(callerobject);

    return (

        <View>
            <Text>Select Collection</Text>
        </View>

    );
};

export default AllVehicle;

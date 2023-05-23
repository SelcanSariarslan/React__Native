import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { unique_intersection } from './ShortestPath';

const AllVehicle = (props) => {
    const [emergencyData, setEmergencyData] = useState([]); // all the data of the vehicles
    const [emergencyLocations, setEmergencyLocations] = useState([]); // just the location of the vehicles
    const [callerLocation, setCallerLocation] = useState("");
    const [callerobject, setCallerobject] = useState([]);
    const [ClosestVehicle, setClosestVehicle] = useState("");
    const [ClosestVehicleNum, setClosestVehicleNum] = useState("");
    const [targetVehicleId, setTargetVehicleId] = useState('');
    const [ClosestVehicleId, setClosestVehicleId] = useState("");


    const [coordinatelog1, setCoordinatelog1] = useState(null);
    const [coordinatelat1, setCoordinatelat1] = useState(null);
    const [coordinatelon2, setCoordinatelon2] = useState(null);
    const [coordinatelat2, setCoordinatelat2] = useState(null);
    const [distance, setDistance] = useState(null);





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
                setCallerLocation(data.map(data => data.location));

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
                const querySnapshot = await collectionRef.where("location", "==", ClosestVehicleNum).get();  //461
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
                        caller_message: callerobject.map(data => data.detail),
                        caller_voice: callerobject.map(data => data.voiceUrl),
                        caller_emergencylevel: callerobject.map(data => data.emergency_level)
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

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // Radius of the Earth in kilometers

        // Convert degrees to radians
        const degToRad = degrees => degrees * (Math.PI / 180);

        // Convert coordinates to radians
        const lat1Rad = degToRad(lat1);
        const lon1Rad = degToRad(lon1);
        const lat2Rad = degToRad(lat2);
        const lon2Rad = degToRad(lon2);

        // Calculate the differences between the coordinates
        const latDiff = lat2Rad - lat1Rad;
        const lonDiff = lon2Rad - lon1Rad;

        // Calculate the Haversine formula
        const a =
            Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;

        return distance;
    }


    /** const coordinate1 = { latitude: 40.7128, longitude: -74.0060 }; // New York City coordinates
     const coordinate2 = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles coordinates */
    useEffect(() => {
        const calculate = async () => {
            var Shortest = Infinity;
            var coordinatelon22;
            var coordinatelat22;
            const myArray = [];

            for (var i = 0; i < unique_intersection.length; i++) {

                if (i == callerLocation) {
                    setCoordinatelog1(unique_intersection[i][0]);
                    setCoordinatelat1(unique_intersection[i][1]);
                    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh caller location :  " + i + " its cordinates is: " + unique_intersection[i]);
                }
            }


            for (var i = 0; i < unique_intersection.length; i++) {

                for (var x = 0; x < emergencyLocations.length; x++) {

                    if (emergencyLocations[x] === i) {
                        // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx" + emergencyLocations[x]);
                        coordinatelon22 = unique_intersection[emergencyLocations[x]][0];
                        coordinatelat22 = unique_intersection[emergencyLocations[x]][1];

                        const newDistance = calculateDistance(
                            coordinatelog1,
                            coordinatelat1,
                            coordinatelon22,
                            coordinatelat22
                        );
                        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq   " + newDistance);
                        myArray.push(newDistance);
                        if (newDistance < Shortest) {
                            Shortest = newDistance;
                        }
                        setClosestVehicle(Shortest);
                    }
                }
            }

            for (var x = 0; x < myArray.length; x++) {

                if (ClosestVehicle == myArray[x]) {

                    setClosestVehicleNum(emergencyLocations[x]);
                    console.log("the closest node is the num : " + emergencyLocations[x]);
                }
            }

            // console.log(myArray);

        };
        calculate();

    }, [unique_intersection, callerLocation, emergencyLocations, distance]);


    console.log(emergencyLocations);
    console.log("");
    console.log("the ClosestVehicle is:");
    console.log(ClosestVehicle);

    return (

        <View>
            <Text></Text>
        </View>

    );
};

export default AllVehicle;

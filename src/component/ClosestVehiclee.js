import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { unique_intersection } from './ShortestPath';

const AllVehicle = (props) => {
    const [emergencyData, setEmergencyData] = useState([]); // all the data of the vehicles
    const [emergencyLocations, setEmergencyLocations] = useState([]); // just the location of the vehicles
    const [callerobject, setCallerobject] = useState([]);
    const [ClosestVehicle, setClosestVehicle] = useState("");
    const [targetVehicleId, setTargetVehicleId] = useState('');
    const [ClosestVehicleId, setClosestVehicleId] = useState("");
    const [callerLocation, setCallerLocation] = useState("");

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


    const coordinate1 = { latitude: 40.7128, longitude: -74.0060 }; // New York City coordinates
    const coordinate2 = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles coordinates
    useEffect(() => {

        const calculate = async () => {
            
            for (var i = 0; i < unique_intersection.length; i++) {
                
                if (i == callerLocation) {
                  setCoordinatelog1(unique_intersection[i][0]);
                  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
                  console.log(coordinatelog1);
                  setCoordinatelat1(unique_intersection[i][1]);
                } else if (emergencyLocations[0] == i) {
                  setCoordinatelon2(unique_intersection[i][0]);
                  setCoordinatelat2(unique_intersection[i][1]);
                  setClosestVehicle(distance);
                  
                  
                }
              }
        };
       
        calculate();
        setDistance( calculateDistance(
          coordinatelog1,
          coordinatelat1,
          coordinatelon2,
          coordinatelat2
        ));
      
        // Perform any additional operations using the distance value
      
      }, [unique_intersection, callerLocation, emergencyLocations]);
      

  



    var i = 10;
    console.log(distance); // Output: 3934.858099589917
    //handleCollectionChange(collection);
    console.log(unique_intersection[callerLocation]);

    console.log("the full object");
    console.log(ClosestVehicle);

    return (

        <View>
            <Text>Select Collection</Text>
        </View>

    );
};

export default AllVehicle;

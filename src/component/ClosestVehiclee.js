import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { unique_intersection } from './ShortestPath';
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
const AllVehicle = (props) => {
    const [emergencyData, setEmergencyData] = useState([]); // all the data of the vehicles
    const [emergencyLocations, setEmergencyLocations] = useState([]); // just the location of the vehicles
    const [callerLocation, setCallerLocation] = useState("");

    const [caller_emergencylevel, setCaller_emergencylevel] = useState("");
    const [caller_image, setCaller_image] = useState("");
    

    caller_emergencylevel
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
        console.log("dddddddddddddddddddddddddddddd");
        console.log(callerobject);
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



    
        const db = firebase.firestore();

        const fetchData = async () => {
            try {
                const collectionRef = db.collection("users");
                const querySnapshot = await collectionRef.where("Id", "==", caller_id).get(); // fetching the object that bellongs to the current user
                const data = querySnapshot.docs.map((doc) => doc.data());
                setCallerobject(data);
                setCallerLocation(data.map(data => data.location));
                setCaller_emergencylevel(data.map(data => data.emergency_level));
                setCaller_image(data.map(data => data.image));

               

            } catch (error) {
                console.log(`Error getting ${"users"} documents: `, error);
            }
        };

        
    
    console.log("setttttttttttttttttttttttttttttttttttttttttt");
    console.log(caller_image[0]);
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
    console.log(callerLocation[0]);

    // sending all the media to the target vechile
   

    const fetchCallerData = async () => {
        fetchData();
        try {
            const userQuerySnapshot = await db.collection("users").where('location', '==', callerLocation[0]).get();  // callerLocation[0]
           // const userIds = userQuerySnapshot.docs.map((doc) => doc.id);
            console.log("********************************************");
console.log(caller_id);
            if (caller_id) {
                

                await db.collection(collection).doc("AdeHeNyWL5Ny8EPYkLIsWou2lHu2").update({  //targetVehicleId[0]
                    caller_id: caller_id,
                    caller_location: callerobject[0].location,
                    caller_image:callerobject[0].image,
                    caller_emergencylevel:callerobject[0].emergency_level,
                    
                });
                console.log('added to Vehicleeeeeeeeeeeeeeeee  '+ caller_id);

            } else {
                console.log('No user found with location: 954');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    
    const handlePress = () => {
        props.handlePress();
        fetchData();
        fetchCallerData();
        
      
    
      };

    return (

        <View>
            <Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.text}>
                        CALL
                    </Text>
                </TouchableOpacity>
            </Text>
        </View>

    );
};

export default AllVehicle;

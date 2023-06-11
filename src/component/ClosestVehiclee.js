import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { unique_intersection } from './ShortestPath';
import Media from '../smalComponent/Media';
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




export var teeeest = "this is";


const AllVehicle = (props) => {
    const { onClick } = props;
    const [targetemergencyData, setTargetEmergencyData] = useState([]); // get the target object data of the vehicles
    const [emergencyData, setEmergencyData] = useState([]); // all the data of the vehicles
    const [emergencyLocations, setEmergencyLocations] = useState([]); // just the location of the vehicles
    const [callerLocation, setCallerLocation] = useState("");
   
    const [caller_emergencylevel, setCaller_emergencylevel] = useState("");
    const [caller_image, setCaller_image] = useState("");
    const [message, setMessage] = useState("");
    const [callerName, setCallerName] = useState("");
    


    const [callerobject, setCallerobject] = useState([]);
    const [ClosestVehicle, setClosestVehicle] = useState("");
    const [ClosestVehicleNum, setClosestVehicleNum] = useState("");
    const [targetVehicleId, setTargetVehicleId] = useState([]);
    const [ClosestVehicleId, setClosestVehicleId] = useState("");


    const [coordinatelog1, setCoordinatelog1] = useState(null);
    const [coordinatelat1, setCoordinatelat1] = useState(null);
    const [coordinatelon2, setCoordinatelon2] = useState(null);
    const [coordinatelat2, setCoordinatelat2] = useState(null);
    const [distance, setDistance] = useState(null);



    const location = props.location;
    const emergency_level = props.level;
    const caller_object = props.callerData;
    const caller_id = props.user_Id;
    const collection = props.vehicle === 'Ambulans' ? 'ambulance' : props.vehicle === 'Police' ? 'police' : props.vehicle === 'FIRE FIGHTING' ? 'fire' : '';

    //console.log(emergencyData);
    
   // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwww");
    //console.log(caller_object);
    useEffect(() => {
        const db = firebase.firestore();
        const locations = [];

        const fetchData = async () => {
            try {
                const collectionRef = db.collection(collection);
                const querySnapshot = await collectionRef.get();
                const data = querySnapshot.docs.map((doc) => doc.data());
                setEmergencyData(data);  // fetching all the data of the vehicle


                // Iterate over the objects inside data
                for (const key in data) {
                    if (data.hasOwnProperty(key) && data[key]?.isReady === true && data[key]?.location != null  ) {
                        // If isReady is true, add the location to the array
                        locations.push(data[key].location);
                    }
                }
                setEmergencyLocations(locations);
            } catch (error) {
                console.log(`Error getting ${collection} documents: `, error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Find the matching object in emergencyData
        const targetObject = emergencyData.find(obj => obj.Id === targetVehicleId[0]);

        if (targetObject) {
            // If a matching object is found, set it as the targetemergencyData
            setTargetEmergencyData(targetObject);
            // console.log("dddddddddddddddddddddddddddddd");
            //console.log(targetemergencyData.isReady);

        } else {
            // If no matching object is found, clear the targetemergencyData
            setTargetEmergencyData([]);
        }
    }, [emergencyData, targetVehicleId[0],ClosestVehicleNum]);


    {/**

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
            setMessage(data.map(data => data.emergency_explenation));
            setCallerName(data.map(data => data.name));





        } catch (error) {
            console.log(`Error getting ${"users"} documents: `, error);
        }
    }; */}



    //console.log("setttttttttttttttttttttttttttttttttttttttttt");
    // console.log(callerobject);
    useEffect(() => {
        const db = firebase.firestore();  // fetching the Id of the target vechile to send the media of the caller later

        const fetchData = async () => {
            try {
                const collectionRef = db.collection(collection);
                const querySnapshot = await collectionRef.where("location", "==", ClosestVehicleNum).get();  //461
                const data = querySnapshot.docs.map((doc) => doc.data());
                setTargetVehicleId(data.map(data => data.Id));
                console.log("setttttttttttttttttttttttttttttttttttttttttt");
               console.log(data);
            } catch (error) {
                console.log(`Error getting ${collection} documents: `, error);
            }
        };

        fetchData();
    }, [collection,ClosestVehicleNum]); //ClosestVehicleNum


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

                if (i == caller_object.location) {
                    setCoordinatelog1(unique_intersection[i][0]);
                    setCoordinatelat1(unique_intersection[i][1]);
                    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh caller location :  " + i + " its cordinates is: " + unique_intersection[i]);
                }
            }


            for (var i = 0; i < unique_intersection.length; i++) {

                for (var x = 0; x < emergencyLocations.length; x++) {

                    if (emergencyLocations[x] === i) {
                     //     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx    " + emergencyLocations[x]);
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
                    console.log("the closest node is the num : " + emergencyLocations[x] + " that is: " + Shortest);
                    console.log(emergencyLocations);
                }
            }

            //console.log(myArray);

        };
        calculate();

    }, [unique_intersection, callerLocation, emergencyLocations, distance,ClosestVehicleNum,caller_object,targetVehicleId]);




    //console.log("the ClosestVehicle is:");
    //console.log(callerLocation);

    // sending all the media to the target vechile


    const handlePress = async () => {
      //  

     await   fetchCallerData();
       // props.handlePress();

    };
   console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyypppppppppppppppppppppppppppppppppyyy  emergencyLocations ");
    console.log(ClosestVehicleNum);
   // console.log(emergencyData);
   // console.log("locations");
   // console.log(targetVehicleId);
    
    AllVehicle.location = location;
    AllVehicle.ClosestVehicleNum = ClosestVehicleNum;
   


    
/**
    useEffect(() => {
        const fetchAndRefreshFile = async () => {
          try {
          //  const response = await fetch('C:\Users\Acer\Desktop\git Desk\React__Native\src\component\FastestPath.js');
          //  const fileContent = await response.text();
            console.log("000000000000000000000000000000000000000000000000000");
          // const fileContent =  require('./FastestPath');
           const dynamicCode = 'console.log("Hello, world!");';
            console.log(dynamicCode);
            eval(dynamicCode);
          } catch (error) {
            console.error('Error fetching or evaluating file:', error);
          }
        };
    
        fetchAndRefreshFile();
      }, []); */


    return (

        <View>
          <Media  ReciverLocation ={ClosestVehicleNum}TargetVehicleId={targetemergencyData.Id} Location={location} EmergencyLevel={emergency_level} Caller_object={caller_object} CallerId={caller_id} Collection={collection} moveTomap={props.handlePress}/>
            
        </View>

    );
    
};

export default AllVehicle;

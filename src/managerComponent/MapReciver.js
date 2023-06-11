import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { Traffic_Roads } from '../assets/private_map/TrafficSignals_Roads';
import Cancel_Button from '../smalComponent/CancelButton';
import { unique_intersection } from './../component/FastestPath';
import FastestResult from '../component/mapResultFastest';
import SSortestResult from '../component/mapResultShortest'


const LeafletMap = (props) => {
   // const { randomNum } = props?.route?.params ? props?.route?.params : "";
   // const { vehicleName } = props?.route?.params ? props?.route?.params : "";
   // const { callerLocation } = props?.route?.params ? props?.route?.params : "";
   // const { reciverLocation } = props?.route?.params ? props?.route?.params : "";
    const reciverMarker= reverseCoordinates(unique_intersection[11]);
    const callerMarker= reverseCoordinates(unique_intersection[22]);

    const fastestresult = FastestResult.FasttestResult;
    const  shortestresult = SSortestResult.ShortesrRes;

    // fastest_Path(callerLocation,reciverLocation);



    const [showCancelButton, setShowCancelButton] = useState(true);
    const [showMinimizeButton, setShowMinimizeButton] = useState(false);


   {/** useEffect(() => {
        const marker = callerLocation;
    }, [callerLocation]); */}

    const handleViewMapButtonPress = () => {
        setShowMinimizeButton(true);
        setShowCancelButton(false);
    };

    const handleMinimizeButtonPress = () => {
        setShowMinimizeButton(false);
        setShowCancelButton(true);
    };

    


    const handleCancelButtonPress = () => {

        Alert.alert('Are you sure  you want to cancel the emergency vehicle!!!', '', [
            {
                text: 'Yes', onPress: () => {
                    if (props.navigation.navigate('Station')) {
                        props.navigation.navigate('Station')
                    } else {
                        props.navigation.goBack();
                    }
                    Alert.alert('Emergency vehicle cancellation  was successful!', '', [
                        { text: 'OK' }
                      ]);
                }
            },{
                text: 'No',
                onPress: () => {
                   
                },
                style: 'cancel', // This will make the button look like a "Cancel" button
              },
        ]);



    };
    function reverseCoordinates(coords) {
        return [coords[1], coords[0]];
    }
    //  console.log(reversedCoords);
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>

    <!--var latlngs = Array();

//Get latlng from first marker
latlngs.push(marker1.getLatLng());

//Get latlng from first marker
latlngs.push(marker2.getLatLng());

//You can just keep adding markers

//From documentation http://leafletjs.com/reference.html#polyline
// create a red polyline from an arrays of LatLng points
var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaflet</title>

    <!-- CSS Part-->
  
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
     integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
     crossorigin=""/>
     <style>
        #map { height: 100vh; }
            </Style>
</head>
<body>
    <div id="map"></div>
    


</body>
</html>



 <!-- ------------------------------------------------------------------------JavaScript Part-->
 <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"
 integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg="
 crossorigin=""></script>
<script src ="points.js"></script>
<script src ="LongRoads.js"></script> 
<script src ="newjson2.js"></script> 
<script src ="shortroad.js"></script> 
<script src ="TrafficSignals.js"></script> 
<script src ="TrafficSignals_Roads.js"></script> 
<script src ="intersection_roads.js"></script> 
<script src ="Dijkstra.js"></script> 
<script src ="map.js"></script> 

 <script>
 var map = L.map('map').setView([39.970277, 32.832307], 14);
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
 osm.addTo(map);
 //heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// var log = ${JSON.stringify(Traffic_Roads)}; //Traffic_Roads
//L.geoJSON(log).addTo(map);


var Result = ${JSON.stringify(shortestresult)};
L.geoJSON(Result, {
    style: RoudStyleBlack
}).addTo(map);

var Fastest_Result = ${JSON.stringify(fastestresult)};
L.geoJSON(Fastest_Result, {
    style: RoudStyleRed
}).addTo(map);

var marker = L.marker(${JSON.stringify(reciverMarker)}).addTo(map);

// Add a popup to the marker
marker.bindPopup("Service");
var marker = L.marker(${JSON.stringify(callerMarker)}).addTo(map);

// Add a popup to the marker
marker.bindPopup("Caller");



 //heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
 function RoudStyleGreen (feature) {
        
        return {color: 'green' , weight: 4
    };
   }
   function RoudStyleRed (feature) {
        
        return {color: 'red' , weight: 4
    };
   }
   function RoudStyleBlue (feature) {
        
        return {color: 'blue' , weight: 4
    };
   }
   function RoudStyleBlack (feature) {
        
        return {color: 'black' , weight: 4
    };
   }

  L.geoJSON(longS, {     // Geen road
    style: RoudStyleGreen
}).addTo(map);


L.geoJSON(Greenroad, {
    style: RoudStyleGreen
}).addTo(map);

L.geoJSON(RedRoad, {
    style: RoudStyleRed
}).addTo(map);

L.geoJSON(BlueRoad, {
    style: RoudStyleBlue
}).addTo(map);


L.geoJSON(Traffic_Roads).addTo(map);


L.geoJSON(Result, {
    style: RoudStyleBlack
}).addTo(map);


L.geoJSON(roads2).addTo(map);  // blue part

L.geoJSON(roads3, {             // red part
    style: RoudStyleRed
}).addTo(map);

L.geoJSON(BPR, {
    style: RoudStyleBlack
}).addTo(map);

L.geoJSON(printMin, {
    style: RoudStyleBlack
}).addTo(map);

  var lights_lenth =lights.features.length;

for (let i = 0; i < lights_lenth ; i++){     //---------------------------------- all lights
  
    L.circle([lights.features[i].geometry.coordinates[1],lights.features[i].geometry.coordinates[0]], {radius: 15 ,color: 'black'}).addTo(map);

}


for (let x = 0; x < all_signals.length; x++)  // -------------------------- lights just in our area 
{
    L.circle([all_signals[x][1],all_signals[x][0]], {radius: 10 ,color: 'green'}).addTo(map);


}


for(let y = 0; y < unique_intersection.length; y++){  // -----------------------print all unrepeated intersections

L.circle([unique_intersection[y][1],unique_intersection[y][0]], {radius: 3 ,color: 'red'}).addTo(map);          

}
//---------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------TESTS------------------------------------------------------------------

//L.circle(lights, {radius: 50}).addTo(map);

//L.geoJSON(Lights).addTo(map);

</script>

  `;
    console.log("----------------------------------------------------------99----------------------------");
   console.log(shortestresult?.features[0]?.geometry?.coordinates);
    //console.log(Fastest_Result.features[0].geometry.coordinates);
    console.log("yes--> randomNum ");
    // console.log(fastest_Path(callerLocation,reciverLocation));


    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingTop: 0, backgroundColor: 'white' }}>

            </View>
            <View style={{ flex: 2, width: '100%', position: 'relative' }}>
                {showCancelButton ? (
                    <Cancel_Button onPress={handleCancelButtonPress} />)
                    : (
                        showMinimizeButton && (
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 15,
                                    right: 15,
                                    backgroundColor: 'red',
                                    padding: 10,
                                    borderRadius: 5,
                                    zIndex: 1,
                                }}
                                onPress={handleMinimizeButtonPress}>
                                <Text style={{ color: 'white', fontSize: 15 }}>Shrinking the map</Text>
                            </TouchableOpacity>
                        )
                    )}
                <View style={{ flex: 1, width: '100%' }}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: htmlContent }}
                        style={{ flex: 1 }}
                    />
                    {showCancelButton && (
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 15,
                                right: 15,
                                backgroundColor: 'red',
                                padding: 10,
                                borderRadius: 5,
                            }}
                            onPress={handleViewMapButtonPress}>
                            <Text style={{ color: 'white', fontSize: 15 }}>View Map</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
           

        </View>
    );

};

export default LeafletMap;



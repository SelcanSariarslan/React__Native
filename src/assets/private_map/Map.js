import React from 'react';
import { WebView } from 'react-native-webview';
import {Text,View} from 'react-native';
import {longS} from './LongRoads' // the varaible must be exactlly the same that is insde the file
import {Traffic_Roads} from './TrafficSignals_Roads'
import {points} from './map (1)'


             
var Traffic_lenth = Traffic_Roads.features.length;
//var Road_lenth =Traffic_Roads.features[0].geometry.coordinates.length;
var counter1 = 0;

// -------------------------------------------------------- intersections  ---------------------------------------

var all_intersections = [];    // to keep all the intersections
 var unique_intersection = [];   // to keep unrepeated intersections
var lenth_road = Traffic_Roads.features.length;
var counter_intersection = 0;
var counter =0;

function Find_intersections() {
    for (let i = 0; i < lenth_road; i++) {
        var lenth_cordinates = Traffic_Roads.features[i].geometry.coordinates.length;
        for (let j = 0; j < lenth_cordinates; j++) {
            var current_lati = Traffic_Roads.features[i].geometry.coordinates[j][0];
            var current_long = Traffic_Roads.features[i].geometry.coordinates[j][1];

            for (let x = i + 1; x < lenth_road; x++) {
                var lenth_cordinates2 = Traffic_Roads.features[x].geometry.coordinates.length;

                for (let y = 0; y < lenth_cordinates2; y++) {

                    if (current_long == Traffic_Roads.features[x].geometry.coordinates[y][1] && current_lati == Traffic_Roads.features[x].geometry.coordinates[y][0]) {
                        // L.circle([current_long,current_lati], {radius: 3 ,color: 'red'}).addTo(map);
                        //----------i will make a boolean functıon to check if the cordinates is exist in the all_intersections or not

                        all_intersections[counter_intersection++] = [Traffic_Roads.features[x].geometry.coordinates[y][0], Traffic_Roads.features[x].geometry.coordinates[y][1]];
                        counter++;
                    }
                }
            }
        }
    }
}

//-------------------------------------------------------------------------------------------------------

//-----------------------------------found unrepeated intersections cordinates----------------------------------
var repeated_cordinates = 0;
var long = 0;
function Find_unique_intersection() {

    for (let i = 0; i < all_intersections.length; i++) {

        for (let y = 0; y < unique_intersection.length; y++) {

            if (all_intersections[i][0] == unique_intersection[y][0]) {

                repeated_cordinates++;
            }
        }
        if (repeated_cordinates == 0) {
            unique_intersection[long++] = all_intersections[i];
        }
        repeated_cordinates = 0;
    }
}
Find_intersections();
Find_unique_intersection();
const LeafletMap = () => {

var distances = [], parents = [], Final_path = [], cordinate_path = [], visited = new Set();
class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
        this.adjacencyList[vertex2][vertex1] = weight;
    }

    changeWeight(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }
    dijkstra(source) {

        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === source) {
                distances[source] = 0;
            } else {
                distances[this.vertices[i]] = Infinity;
            }
            parents[this.vertices[i]] = null;
        }

        let currVertex = this.vertexWithMinDistance(distances, visited);


        while (currVertex !== null) {
            let distance = distances[currVertex],
                neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                if (distances[neighbor] > newDistance) {
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currVertex;
                }
            }

            visited.add(currVertex);
            currVertex = this.vertexWithMinDistance(distances, visited);

        }

        console.log(parents);
        console.log(distances);


    }
    vertexWithMinDistance(distances, visited) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited.has(vertex)) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }

    findOptimalPath(goal) {
        var key = [];
        var value = [];
        key = Object.keys(parents);
        value = Object.values(parents);
        // console.log("goo "+goal);
        var counter = 0;
        while (goal != null) {

            for (let i = 0; i < key.length; i++) {
                if (key[i] == goal && key[i] != null) {

                    Final_path[counter++] = key[i];
                    goal = value[i];
                }

            }
        }
        var cou = 0; //counter
        for (let i = Final_path.length - 1; i >= 0; i--) {
            cordinate_path[cou++] = Final_path[i];

        }


    }

}

 let g = new Graph();

var edge_long = [];
var edge_counter = 0;
var checkking = 0;
var combinedMatrex = [];

var allVertex = [];
var allVertex_counter = 0;


add_vertices();

creating_graph();

var length_of_current_row_counter = 0;
function creating_graph() {
    for (let i = 0; i < Traffic_Roads.features.length; i++) { // rows
        var LenthOfRoad = Traffic_Roads.features[i].geometry.coordinates.length;

        for (let j = 0; j < LenthOfRoad; j++) { // coordinates
            var x = Traffic_Roads.features[i].geometry.coordinates[j][0];
            allVertex[allVertex_counter++] = Traffic_Roads.features[i].geometry.coordinates[j];
            // console.log(x);
            //  g.addVertex(Traffic_Roads.features[i].geometry.coordinates[j]);
            if (isExist(x) && checkking < 2) {  // if a cordinates equal to an intersection
                edge_long[edge_counter++] = Traffic_Roads.features[i].geometry.coordinates[j];
                checkking++;
                if (checkking == 2) {         // to make sure that we have all the node that are between the two intersection nodes
                   
                    var llength = Calculate_lent_of_edge(edge_long);

                   // add_nodes(edge_long);
                    add_edgs(edge_long, llength);   // adding edgs with its real length to the graph
                    edge_long.length = 0;
                    edge_counter = 0;
                    edge_long[edge_counter++] = Traffic_Roads.features[i].geometry.coordinates[j];
                    checkking = 1;
                }

            } if (!isExist(x) && checkking == 1 && length_of_current_row_counter == 0) {   // kepping the normal node (not intersection node) that is could be between tow intersections
                edge_long[edge_counter++] = Traffic_Roads.features[i].geometry.coordinates[j];

            }

            //checkking=0;
        }
        length_of_current_row_counter++;
        if (length_of_current_row_counter != 0) {  // we understand that the row of the coordinates is finished 
            edge_long.length = 0;
            edge_counter = 0;
            checkking = 0;
        }
        length_of_current_row_counter = 0;
    }
}

function add_vertices() {
    for (let q = 0; q < unique_intersection.length; q++) {
        g.addVertex(unique_intersection[q]);

    }
}
function add_edgs(edge_long, lenth_road) {
    var first = edge_long[0];
    var last = edge_long[edge_long.length - 1];
    g.addEdge(first, last, lenth_road);
}

function Calculate_lent_of_edge(edge_long) {
    var Long1 = 0;
    for (let q = 0; q < edge_long.length - 1; q++) {

        var startLat1 = edge_long[q][0]; // first cordinate
        var endLon1 = edge_long[q][1];

        var startLat2 = edge_long[q + 1][0]; // second cordinates
        var endLon2 = edge_long[q + 1][1];
        Long1 += getDistanceFromLatLonInKm(startLat1, endLon1, startLat2, endLon2);
    }
    return Long1;

}

function isExist(num) {

    for (let q = 0; q < unique_intersection.length; q++) {
        if (num == unique_intersection[q][0]) {
            return true;
        }
    }
    return false;
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {  //for finding the Distance between two points  
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;

}
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function isExistInRow(StartCordinate, EndCordinate, row) {  // to check if our intersections in just one row to print the between on to the map

    return row.includes(StartCordinate) && row.includes(EndCordinate);
}



g.dijkstra(unique_intersection[200]); // from  5
g.findOptimalPath(unique_intersection[212]);  // to  22


var for_cordinate = [];  // split then insert the nodes in revers order to print them on the map 
for (let i = 0; i < cordinate_path.length; i++) {

    const str = cordinate_path[i];
    const arr = str.split(',');
    for_cordinate[i] = [arr[0], arr[1]];

}

var Result = {
    "type": "FeatureCollection",
    "name": "shortIntersection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "full_id": "w191236744", "osm_id": "191236744", "osm_type": "way", "osm_version": "6", "osm_timestamp": "2022-06-09T21:32:07.000", "osm_uid": "14474713", "osm_user": "pinkyPrii", "osm_changeset": "122184284", "highway": "tertiary" }, "geometry": { "type": "LineString" } },
    ]
}
console.log(Result.features[0].geometry.coordinates = for_cordinate); // Adding the coordinates to the Result and printing the coordinates on the consol same time
//console.log(Result.features[0].geometry.coordinates[1]=[32.8319655, 39.9557678]);


var x="xxx";
console.log(Result);
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
 var map = L.map('map').setView([39.925533, 32.866287], 12);
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
 osm.addTo(map);
 //heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
 var log = ${JSON.stringify(Traffic_Roads)};
L.geoJSON(log).addTo(map);
var Result = ${JSON.stringify(Result)};
L.geoJSON(Result, {
    style: RoudStyleBlack
}).addTo(map);

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

/*L.geoJSON(BlackRoad, {
    style: RoudStyleBlack
}).addTo(map);*/




















//tekRoad2

L.geoJSON(Traffic_Roads).addTo(map);


L.geoJSON(Result, {
    style: RoudStyleBlack
}).addTo(map);










/*
L.geoJSON(Traffic_Roads.features[7], {             // red part
    style: RoudStyleRed
}).addTo(map);



L.geoJSON(Traffic_Roads.features[13], {             // red part
    style: RoudStyleRed
}).addTo(map);


L.geoJSON(Traffic_Roads.features[12], {             // red part
    style: RoudStyleRed
}).addTo(map);

L.geoJSON(Traffic_Roads.features[14], {             // red part
    style: RoudStyleGreen
}).addTo(map);



L.geoJSON(Traffic_Roads.features[15], {             // red part
    style: RoudStyleBlue
}).addTo(map);


L.geoJSON(Traffic_Roads.features[16], {             // red part
    style: RoudStyleGreen
}).addTo(map);


*/





//L.geoJSON(Traffic_Roads).addTo(map);       hhhhhhhhhhhhhhhhhhhhhhhhhhhh
//L.geoJSON(points).addTo(map);


L.geoJSON(A).addTo(map).bindPopup('A').openPopup();
L.geoJSON(B).addTo(map).bindPopup('B').openPopup(); // start
L.geoJSON(C).addTo(map).bindPopup('C').openPopup();
L.geoJSON(D).addTo(map).bindPopup('D').openPopup();


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




/*for (let i = 0; i < Traffic_lenth; i++) {
    if(Traffic_Roads.features[i].properties.osm_version =="1"){
      var version=Traffic_Roads.features[i];
      L.geoJSON(version, {
        style: RoudStyleBlack
        }).addTo(map);
    }
  }*/



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



//L.geoJSON(newthing).addTo(map);

//L.geoJSON(intersec).addTo(map);

//L.geoJSON(lines).addTo(map);   lines with the lot of points

L.polyline(latlngs, {color: 'red'}).addTo(map); // left red lines

//L.circle([ 40.0295469, 32.6810182 ],{radius: 50}).addTo(map);


//L.geoJSON(points).addTo(map);
//L.marker([32.6810182, 40.0295469]).addTo(map);

/*L.marker(D[0].features[0].geometry.coordinates, ).addTo(map);
L.marker([ 32.6810182, 40.0295469 ] ).addTo(map);//A*/



//L.circle(lights, {radius: 50}).addTo(map);

//L.geoJSON(Lights).addTo(map);






</script>




  `;

  return (
    
    <View style={{ flex: 50,width:425 }}>
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
    />
  </View>
  );
};

export default LeafletMap;


/*import React from 'react';
import { View, WebView } from 'react-native-webview';

const MyWebComponent = () => {
  const htmlFile = require('C:\Users\Acer\Desktop\test2_react\ProjectName2\assetsGptestnew.html');

  return (
    <View style={{ flex: 1 }}>
      <WebView source={htmlFile} />
    </View>
  );
};

export default MyWebComponent;
 */
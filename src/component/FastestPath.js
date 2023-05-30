
import { Traffic_Roads } from '../assets/private_map/TrafficSignals_Roads'; // the varaible must be exactlly the same that is insde the file
import { lights } from '../assets/private_map/TrafficSignals';



// -------------------------------------------------------- Traffic lights  ---------------------------------------




var all_signals = [];  //---------------------  we found the commen signal traffics and assghin a new property to hold "yes" and its cordinates ------------------


var lights_lenth = lights.features.length;                    // dikkat to the lenth in this row
var Traffic_lenth = Traffic_Roads.features.length;
//var Road_lenth =Traffic_Roads.features[0].geometry.coordinates.length;
var counter = 0;
var counter1 = 0;
//var min = Traffic_Roads.features[0].geometry.coordinates[0][0];
Find_traffic_signals();


function Find_traffic_signals() {

    for (let i = 0; i < lights_lenth; i++)  // for the traffic signals
    {
        var signal_lat = lights.features[i].geometry.coordinates[0];
        var signal_lon = lights.features[i].geometry.coordinates[1];

        if (signal_lon <= 39.9846044 /*max */ && signal_lat >= 32.8163794 && /*min*/signal_lon <= 39.9846044 && signal_lat >= 32.8163794) {  // for getting red of the lamb that does not bellong to this area
            for (let x = 0; x < Traffic_lenth; x++) {  // for the roads in this graph in this page (represents the rows in this page)
                var Road_lenth = Traffic_Roads.features[x].geometry.coordinates.length;

               
                for (let y = 0; y < Road_lenth; y++) { //for the node numbers (cordinates) in each row in this page 


                    if (signal_lat == Traffic_Roads.features[x].geometry.coordinates[y][0] && signal_lon == Traffic_Roads.features[x].geometry.coordinates[y][1]) {

                        Traffic_Roads.features[x].properties.traffic_signal = "yes";
                        Traffic_Roads.features[x].properties.traffic_signal_coordinates = [signal_lat, signal_lon];
                        all_signals[counter1] = [signal_lat, signal_lon];

                       // console.log("var in " + x);
                        counter1++;
                    } else {
                        if (Traffic_Roads.features[x].properties.traffic_signal != "yes") {

                            Traffic_Roads.features[x].properties.traffic_signal = "no";

                        }
                    }
                    counter++;
                }
            }
        }

    }
}
//console.log("loop was 6700000 now is " + counter);
//console.log("Lamba is " + counter1);

var last = Traffic_Roads.features[26].properties.traffic_signal;
//console.log("Traffic_Signals--------------------------- is " + last);
//console.log(Traffic_Roads.features[114].properties);
//console.log("Result is: "+ Result.features[0].geometry.coordinates[0]);

//--------------------------------------------------------------------------------------------------------------





// -------------------------------------------------------- intersections  ---------------------------------------

var all_intersections = [];    // to keep all the intersections
var unique_intersection = [];   // to keep unrepeated intersections
var lenth_road = Traffic_Roads.features.length;
var counter_intersection = 0;
var counter = 0;

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
let fasttest = new Graph();

var edge_long = [];
var edge_counter = 0;
var checkking = 0;
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
                    if(Traffic_Roads.features[i].properties.traffic_signal == "yes"){  //we are testing if we have a traffic light in a part of a road, if yes we make this part longer by adding value '5' as distance to be avoided by our algorithm
                         // console.log(Traffic_Roads.features[i].properties.traffic_signal);
                        add_edgs_fasttest(edge_long, llength + edge_counter + llength*(2));  //  edge_counter for avoiding the street roundabouts and long roads by counting the number of nods(dotes), and the '5' is for adding a good distance for a part of a roads if these roads contain some traffic lights/signals 
                    }else{
                        add_edgs_fasttest(edge_long, llength + edge_counter);
                    }
                     // adding edgs with its real length + number of dotes of the roads to the graph of the fastest
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
        fasttest.addVertex(unique_intersection[q]);

    }
}

function add_edgs_fasttest(edge_long, lenth_road) {
    var first = edge_long[0];
    var last = edge_long[edge_long.length - 1];
    fasttest.addEdge(first, last, lenth_road);
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


// split then insert the nodes in revers order to print them on the map 
var for_cordinate = [];

for (let i = 0; i < cordinate_path.length; i++) {

    const str = cordinate_path[i];
    const arr = str.split(',');
    for_cordinate[i] = [arr[0], arr[1]];

}




fastest_Path();


var for_cordinate_fastest = [];

for (let i = 0; i < cordinate_path.length; i++) {

    const str = cordinate_path[i];
    const arr = str.split(',');
    for_cordinate_fastest[i] = [arr[0], arr[1]];

}

export var Fastest_Result = {
    "type": "FeatureCollection",
    "name": "shortIntersection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "full_id": "w191236744", "osm_id": "191236744", "osm_type": "way", "osm_version": "6", "osm_timestamp": "2022-06-09T21:32:07.000", "osm_uid": "14474713", "osm_user": "pinkyPrii", "osm_changeset": "122184284", "highway": "tertiary" }, "geometry": { "type": "LineString" } },
    ]
}
Fastest_Result.features[0].geometry.coordinates = for_cordinate_fastest;

//console.log(Fastest_Result.features[0].geometry.coordinates = for_cordinate_fastest);

function fastest_Path(){
    fasttest.dijkstra(unique_intersection[129]); // from  129
    fasttest.findOptimalPath(unique_intersection[14]);  // to  22
    
    }
    //console.log("Fastest_Result is: "+Fastest_Result.features[0].geometry.coordinates);
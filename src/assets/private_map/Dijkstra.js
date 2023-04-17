


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
/*
// add the vertices
g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")


g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "E", 3);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g .addEdge("D", "E", 3);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

g.dijkstra("A"); // from
g.findOptimalPath("F"); //to */


/*var arrayy=[[1,1],[2,2],[3,3]];
g.addVertex(arrayy[0]);
g.addVertex(arrayy[1]);
g.addVertex(arrayy[2]);



// create the edges
g.addEdge(arrayy[0], arrayy[1], 2);
g.addEdge(arrayy[1], arrayy[2], 2);
g.addEdge( arrayy[2],arrayy[0], 9);



g.dijkstra(arrayy[0]); // from
g.findOptimalPath(arrayy[2]);  //to  */







var edge_long = [];
var edge_counter = 0;
var checkking = 0;
var combinedMatrex = [];
var firstArray = unique_intersection;
var firstArray_counter = 0;
var allVertex = [];
var allVertex_counter = 0;


//console.log("ooo Traffic_Roads.features[i].geometry.coordinates[j]",Traffic_Roads.features[1].geometry.coordinates);
//               ----------------dikkaaaaaaaaaat--------------
add_vertices();
//console.log("1111  "+g.vertices.length);
//matchArrays(allVertex, unique_intersection);
creating_graph();
//combined_arrays(firstArray,secondArray);
//console.log("22222  "+g.vertices.length);

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
                    print(edge_long);
                    var llength = Calculate_lent_of_edge(edge_long);

                   // add_nodes(edge_long);
                    add_edgs(edge_long, llength);   // adding edgs with its real length to the graph

                    //console.log("looong" + llength);
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

//console.log(print(edge_long));
//console.log("looong"+ Calculate_lent_of_edge(edge_long));
//edge_long.length=0;
//edge_long[0]=[32.8396412, 39.9538228];
//edge_long[1]=[32.8312208, 39.9550885];


//console.log("distaince is "+Calculate_lent_of_edge(edge_long));

function vertexExists(arr, node) {
    return node.includes(arr);
}

function matchArrays(allVertex, unique_intersection) {
    
  
    for (let i = 0; i < allVertex.length; i++) {
      if (unique_intersection.includes(allVertex[i])) {
        g.addVertex(allVertex[i]);
      }
    }
  
    return C;
  }

function combined_arrays(firstArray, secondArray) {
    combinedMatrex[firstArray.length + secondArray.length];
    for (let q = 0; q < firstArray.length; q++) {
        combinedMatrex[q] = firstArray[q];


    }
    for (let q = 0; q < secondArray.length; q++) {
        combinedMatrex[combinedMatrex.length] = firstArray[q];


    }
   // console.log("first is :" + firstArray.length);
   // console.log("secondArray is :" + secondArray.length);
  //console.log("lentheeeeeeee is :" + combinedMatrex.length);

}

function add_nodes(edge_long) {
    var first = edge_long[0];
    var last = edge_long[edge_long.length - 1];

   
        g.addVertex(first);
    
    
        g.addVertex(last);
    


    // check if vertices already exist in adjacencyList






}

function add_vertices() {
    for (let q = 0; q < unique_intersection.length; q++) {
        g.addVertex(unique_intersection[q]);
      //  console.log(unique_intersection.length);


    }
    // console.log("allVertex.length);
}
function add_edgs(edge_long, lenth_road) {
    var first = edge_long[0];
    var last = edge_long[edge_long.length - 1];
    //console.log(first,last,lenth_road);

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

function print(edge_long) {

    for (let q = 0; q < edge_long.length; q++) {
      //  console.log(edge_long[q]);
    }

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








//console.log(distances["B"]);  this is a key
//console.log(distances.B);


//if (distances["B"]==5) {

//  console.log("ok")
//}



/*



var arrayy=edge_long;
g.addVertex(arrayy[0]);
g.addVertex(arrayy[1]);

g.addVertex(arrayy[3]);


g.addEdge(arrayy[0],arrayy[3], 3);

*/


// create the edges
/*g.addEdge(arrayy[0], arrayy[1], 2);
g.addEdge(arrayy[1], arrayy[2], 2);
g.addEdge( arrayy[2],arrayy[0], 9); */
//add_edgs(arrayy,3)











g.dijkstra(unique_intersection[200]); // from  5
g.findOptimalPath(unique_intersection[222]);  // to  22





var for_cordinate = [];  // split then insert the nodes in revers order to print them on the map 
for (let i = 0; i < cordinate_path.length; i++) {

    const str = cordinate_path[i];
    const arr = str.split(',');
    for_cordinate[i] = [arr[0], arr[1]];

}


console.log(Result.features[0].geometry.coordinates = for_cordinate); // Adding the coordinates to the Result and printing the coordinates on the consol same time
//console.log(Result.features[0].geometry.coordinates[1]=[32.8319655, 39.9557678]);

function Find_Between_two_intersecions() {
    // console.log("cccccccccc:  "+Result.features[0].geometry.coordinates[0]);
    var numOfCoordinatesResult = Result.features[0].geometry.coordinates.length;
    // console.log(numOfCoordinatesResult);
    // for (let i = 0; i < Traffic_Roads.features.length; i++){
    //var LenthOfRoad =Traffic_Roads.features[i].geometry.coordinates.length;
    //for (let j = 0; j < LenthOfRoad; j++){
    var start = Result.features[0].geometry.coordinates[0];
    var end = Result.features[0 + 1].geometry.coordinates[0];

    if (isExistInRow(start, end, Traffic_Roads.features[0].geometry.coordinates[0])) {
       // console.log("okk" + j);


    }


}
//  }



//  }
//Find_Between_two_intersecions();





// console.log("aaaaaaaaaaaaaaaa"+for_cordinate[2]); // prints ['abc', 'def', 'ghi']



//console.log("wwwwww"+typeof(Final_path[0]));



//console.log(Result.features[0].geometry.coordinates=[arr[1],arr[0]]);





/*
    var f_path=[];
    for(let i=0;i<Final_path.length;i++){
      //  f_path[i][0]=Final_path[i];
      
         console.log("wwwwww"+Final_path[1]);
    }


            var x =Final_path[1];
       console.log(Result.features[0].geometry.coordinates=[x,x]);
       console.log(Result.features[0].geometry.coordinates[0]); */

// console.log("cordinates  "+Result.features[0].geometry.coordinates[0][2]);


//console.log(Result.features[0].geometry.cor=[[1,2]]);
// console.log(Result.features[0].geometry.cor=[[3,4]]);

console.log(cordinate_path);

 var Result = {
    "type": "FeatureCollection",
    "name": "shortIntersection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "full_id": "w191236744", "osm_id": "191236744", "osm_type": "way", "osm_version": "6", "osm_timestamp": "2022-06-09T21:32:07.000", "osm_uid": "14474713", "osm_user": "pinkyPrii", "osm_changeset": "122184284", "highway": "tertiary" }, "geometry": { "type": "LineString" } },
    ]
}
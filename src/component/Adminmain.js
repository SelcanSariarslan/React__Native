import React from 'react';
import { WebView } from 'react-native-webview';
import {Text,View} from 'react-native';



const LeafletMap = () => {

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
 var points = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[32.858986409894555,39.955453150485226],[32.859941690703465,39.956448694186406],[32.86057496674647,39.957559407657385],[32.860789636592045,39.9583245553323]],"type":"LineString"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[[32.85899714338581,39.955453150485226],[32.85911521180114,39.955280368697316],[32.860403230871015,39.95445759229142],[32.86036029690209,39.95428480798887],[32.85997389118103,39.95397214956935]],"type":"LineString"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81988786821549,39.97640544505725],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81859469091347,39.9761758288582],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.82029790004265,39.97578910509594],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81823197045034,39.97541446436398],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.82062907959511,39.97513650378389],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81785347953286,39.97472560346506],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.82083409550873,39.974761859474484],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81864200227852,39.97444764008324],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81848429772896,39.97430261526188],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81774308634843,39.97447181085684],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81739613634062,39.975946211888356],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81726997270181,39.97464100603369],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.8172857431571,39.97543863479572],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81665492496094,39.97570450898104],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81635528631725,39.97524527110201],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.81722266133673,39.97503982157835],"type":"Point"}},
{"type":"Feature","properties":{},"geometry":{"coordinates":[[32.81635750196159,39.975247370482066],[32.81660992188395,39.975689506096415],[32.81729506167542,39.975447713536965],[32.81724998668895,39.97505393525205],[32.817259001686466,39.97463252088997],[32.817844976507615,39.97472923916942],[32.81824163638666,39.97541317167284],[32.818620266271864,39.97616618035056],[32.81743028663462,39.97597965603816],[32.81727703168144,39.97546843864677]],"type":"LineString"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[[32.818611251274376,39.97616618035056],[32.819873350889395,39.97638724554318],[32.8202880407635,39.97578622288083],[32.820648640653644,39.97514374453431],[32.82084697059321,39.97477759825861],[32.818629281269295,39.9744529008631],[32.81844898132374,39.97427328036497],[32.81775482653589,39.97448744321264],[32.817853991505075,39.97472923916942],[32.82063061065867,39.97513683613195]],"type":"LineString"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[[32.8202880407635,39.975765497866576],[32.818250651384176,39.97540626329774]],"type":"LineString"}}]}

L.geoJSON(points).addTo(map);

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





 
        //--------------------------------------------------------------------
 /**
 * Encapsulates a graph node/vertex
 * Holds references to connected nodes with weights
 */


/*
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")


graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

*/
























/*

1) must save all the intersections in an array
2) must save all the unique intersections in an array
3) must save the cordinates of the traffic lieghts in the same row with its cordinates and yes or no
4) 

*/


</script>




  `;

  return (
    
    <View style={{ flex: 50,width:500 }}>
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
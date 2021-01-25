
// Earthquake link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  
// Perform a GET request to the query URL
  d3.json(link, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });


  function getColor(d) {

    return d < 1 ? 'rgb(111, 250, 5)' : 
           d < 2 ? 'rgb(0, 255, 238)' :
           d < 3 ? 'rgb(238, 250, 2)' :
           d < 4 ? 'rgb(240, 59, 32)' :
                   'rgb(245, 7, 19)';
}







  function createFeatures(earthquakeData) {
    // for (var i = 0; i < earthquakeData.features.length; i++) {

    //   var earthquake = earthquakeData.features[i].geometry.coordinates;
    // }



    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,

      pointToLayer: function (feature, latlng) {
        var geojsonMarkerOptions = {
        radius: 4*feature.properties.mag,
        fillColor: getColor(feature.properties.mag),
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
        }   



    });
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
  }



  function createMap(earthquakes) {

  // Adding layer
    // var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "mapbox/streets-v11",
    //   accessToken: API_KEY
    // });

    // var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "mapbox/dark-v10",
    //   accessToken: API_KEY
    // });






    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

// Define a baseMaps object to hold our base layers
  var baseMaps = {
  "Street Map": streetmap
  // "Dark Map": darkmap
  };


// Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };


// Creating map object
  var map = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });



  // Our style object
var mapStyle = {
    color: "white",
    fillColor: "pink",
    fillOpacity: 0.5,
    weight: 1.5
  };
  
 
  var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

    L.geoJson(data, {
  //     // Passing in our style object
      style: mapStyle
    }).addTo(map);


L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(map);

}


 

  
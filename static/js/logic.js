// Creating map object
var map = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 4
  });
  


  // Adding tile layer
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: API_KEY

  }).addTo(map);

  
  // If data.beta.nyc is down comment out this link
  //var link = "http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/" +
  //"35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";

//   var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


  // Our style object
var mapStyle = {
    color: "white",
    fillColor: "pink",
    fillOpacity: 0.5,
    weight: 1.5
  };
  
  // Grabbing our GeoJSON data..   adding new functionality line 40
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data


    L.geoJson(data, {
  //     // Passing in our style object
      style: mapStyle
    }).addTo(map);
  });









  
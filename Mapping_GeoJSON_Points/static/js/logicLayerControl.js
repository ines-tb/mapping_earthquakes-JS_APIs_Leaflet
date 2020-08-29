// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the default background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: "mapbox/streets-v11",
	accessToken: API_KEY
});

// We create the dark tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: "mapbox/dark-v10",
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	Street: streets,
	Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [30, 30],
	zoom: 2,
	layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/ines-tb/mapping_earthquakes-JS_APIs_Leaflet/master/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
	// Creating a GeoJSON layer with the retrieved data.
	L.geoJson(data, {
		    // We turn each feature into a marker on the map.
		    onEachFeature: function(feature, layer) {
		      console.log(layer);
			  layer.bindPopup("<h2>Airport code: " + layer.feature.properties.faa + "</h2><hr><h3>Airport name: "+ layer.feature.properties.name + "</h3>");
			}
		}).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

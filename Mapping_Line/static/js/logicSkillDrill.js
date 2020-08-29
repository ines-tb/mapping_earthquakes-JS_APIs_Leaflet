// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at center of US.
let map = L.map('mapid').setView([38.3454023,-96.8638445], 5);


// Airline route from SFO --> JFK --> AUS --> YYZ --> CLT. 
// Blue dashed line, with a weight of 4 and opacity of 0.5 on the light map.
// Coordinates for each point to be used in the line.
let line = [
	[37.6213, -122.3790], // SFO airport coordinates
	[30.1974, -97.66854], // AUS airport coordinates
	[43.6777, -79.62700], // YYZ airport coordinates
	[35.2144, -80.94950], // CLT airport coordinates
	[40.6528, -73.81622] // JFK airport coordinates
  ];

// Create a polyline using the line coordinates and make the line black.
L.polyline(line, {
	color: "blue",
	dashArray: 10,
	weight: 4
 }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: "mapbox/dark-v10",
	opacity: 0.5,
	accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);




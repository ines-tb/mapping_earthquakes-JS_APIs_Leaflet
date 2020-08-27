// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level (zoom level of “4” on a scale 0–18.)
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Add a circle to the map centered on Los Angeles, CA, with a 100m radius
// L.circle([34.0522, -118.2437], {
// 	color: 'black',
// 	fillColor: 'yellow',
// 	fillOpacity: 0.5,
// 	radius: 300
//  }).addTo(map);

// It can also be done with circleMarker() function with radius in pixels
L.circleMarker([34.0522, -118.2437], {
	color: 'black',
	fillColor: 'yellow',
	// fillOpacity: 0.5,
	radius: 300
 }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: "mapbox/dark-v10",
	accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level (zoom level of “4” on a scale 0–18.)
let map = L.map('mapid').setView([40.7, -94.5], 4);

// Loop through the cities array and create one marker for each city.
// Add popup with the name of the city, state, and population
cities.forEach(function (city){
	console.log(city);
	L.circleMarker(city.location,{
		radius: (city.population - 200000) / 100000,
		color: 'orange',
		fillColor: 'orange',
		weight: 4,
	}).addTo(map).bindPopup("<h2>" + city.city + " , " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>");
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	// id: "mapbox/streets-v11",
	id: "mapbox/dark-v10",
	accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

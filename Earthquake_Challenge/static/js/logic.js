// Add console.log to check to see if our code is working.
console.log("working");

// We create the streets tile layer that will be the default background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: "mapbox/streets-v11",
	accessToken: API_KEY
});

// We create the satellite streets tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: "mapbox/satellite-streets-v11",
	accessToken: API_KEY
});

// We create the light tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: "mapbox/light-v10",
	accessToken: API_KEY
});

// Create a base layer that holds all three maps.
let baseMaps = {
	"Streets": streets,
	"Satellite streets": satelliteStreets,
	"Light": light
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();
// Create the tectonic plates layer for our map.
let tectonicPlates = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
	"Earthquakes": earthquakes,
	"Tectonic Plates": tectonicPlates
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets,earthquakes]
})

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the Earthquakes and Tectonic Plates data GeoJSON URLs.
let earthquakesData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectonicPlatesData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Grabbing our Earthquakes GeoJSON data.
d3.json(earthquakesData).then(function(data) {

	// This function returns the style data for each of the earthquakes we plot on
	// the map. We pass the magnitude of the earthquake into two separate functions
	// to calculate the color and radius.
	function styleInfo(feature) {
		return {
		opacity: 1,
		fillOpacity: 1,
		fillColor: getColor(feature.properties.mag),
		color: "#000000",
		radius: getRadius(feature.properties.mag),
		stroke: true,
		weight: 0.5
		};
	}

	// This function determines the color of the circle based on the magnitude of the earthquake.
	function getColor(magnitude) {
		if (magnitude > 5) {
		return "#ea2c2c";
		}
		if (magnitude > 4) {
		return "#ea822c";
		}
		if (magnitude > 3) {
		return "#ee9c00";
		}
		if (magnitude > 2) {
		return "#eecc00";
		}
		if (magnitude > 1) {
		return "#d4ee00";
		}
		return "#98ee00";
	}

	// This function determines the radius of the earthquake marker based on its magnitude.
	// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
	function getRadius(magnitude) {
		if (magnitude === 0) {
		return 1;
		}
		return magnitude * 4;
	}

	// Creating a GeoJSON layer with the retrieved data.
	L.geoJSON(data, {
		// We set the style for each circleMarker using our styleInfo function.
		style: styleInfo,
		pointToLayer: function(feature, latlng) {			
			return L.circleMarker(latlng);
		},
		// We create a popup for each circleMarker to display the magnitude and
		//  location of the earthquake after the marker has been created and styled.
		onEachFeature: function(feature, layer) {
			layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
		}
	}).addTo(earthquakes);
	
	// Create a legend control object.
	let legend = L.control({
		position: "bottomright"
	});
	
	// Then add all the details for the legend.
	legend.onAdd = function() {

		let div = L.DomUtil.create("div", "info legend");

		const magnitudes = [0, 1, 2, 3, 4, 5];
		const colors = [
		"#98ee00",
		"#d4ee00",
		"#eecc00",
		"#ee9c00",
		"#ea822c",
		"#ea2c2c"
		];
		
		// Legend title
		div.innerHTML += "<h4 id='legendTitle'>Magnitude</h4>"

		// Looping through our intervals to generate a label with a colored square for each interval.
		for (var i = 0; i < magnitudes.length; i++) {
			div.innerHTML +=
			"<i style='background: " + colors[i] + "'></i> " +
			magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
		}
		return div;
	};
   
	legend.addTo(map);
	
	// We add the earthquake layer to the map
	earthquakes.addTo(map);
});



// Grabbing our Tectonic Plates GeoJSON data.
d3.json(tectonicPlatesData).then(function(data) {
	
	let platesStyle = {
		color: "#ff3300",
		weight: 1.5
	};

	// Creating a GeoJSON layer with the retrieved data.
	L.geoJSON(data, {
		style: platesStyle
	}).addTo(tectonicPlates);

	// We add the tectonic plates layer to the map
	tectonicPlates.addTo(map);
});

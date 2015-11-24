
var drawMap = function() {
	var map = L.map('container').setView([35, -100], 4);
	//var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
	//var layer = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png');
	//var layer = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/0/0/0.png.json?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ');
	//var layer = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/page.html?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ#3/0.00/0.00');
	var layer1 = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ');
	var layer2 = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ');
	var layer3 = L.tileLayer('https://api.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ');
	var layer4 = L.tileLayer('https://api.mapbox.com/v4/mapbox.wheatpaste/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ');
	var layer5 = L.tileLayer('https://api.mapbox.com/v4/mapbox.pencil/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ');
	var layer6 = L.tileLayer('https://api.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ');
	var layer7 = L.tileLayer('https://api.mapbox.com/v4/mapbox.high-contrast/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFzdGVyYnVkZGEiLCJhIjoiY2lnMWp0a2JoMHliOHVybTM1YndjbXk3MiJ9.fWlnE73fXQQNlpthp5S4GQ');
	layer1.addTo(map);

	var baseLayers = {
		"Streets View": layer1,
		"Satellite View": layer2,
		"Comic View": layer3,
		"Wheatpaste View": layer4,
		"Pencil View": layer5,
		"Pirates View": layer6,
		"High-contrast View": layer7,
		//"": layer,
	}
	getData(map, baseLayers);
}

// Function for getting data
var getData = function(map, baseLayers) {
	$.get( "data/response.json", function( data ) {
		customBuild(data, map, baseLayers);
	});
}	

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map, baseLayers) {
	parsedData = JSON.parse(data);
	//console.log(data);
	//var gender = L.layerGroup([male, female, unknown]);
	var male = new L.LayerGroup([]);
	var female = new L.LayerGroup([]);
	var unknown = new L.LayerGroup([]);

	var count1 = 0;
	var count2 = 0;
	var count3 = 0;
	var count4 = 0;

	for (i = 0; i < parsedData.length; i++) {
		if (parsedData[i]["Race"] == 'White') {
			var circle = new L.circleMarker([parsedData[i].lat, parsedData[i].lng], {color:'red'});
		} else if (parsedData[i]["Race"] == 'Black or African American') {
			var circle = new L.circleMarker([parsedData[i].lat, parsedData[i].lng], {color:'green'});
		} else if (parsedData[i]["Race"] == 'Asian') {
			var circle = new L.circleMarker([parsedData[i].lat, parsedData[i].lng], {color:'blue'});
		} else if (parsedData[i]["Race"] == 'American Indian or Alaska Native') {
			var circle = new L.circleMarker([parsedData[i].lat, parsedData[i].lng], {color:'purple'});
		} else if (parsedData[i]["Race"] == 'Native Hawaiian or Other Pacific Islander') {
			var circle = new L.circleMarker([parsedData[i].lat, parsedData[i].lng], {color:'orange'});
		} else {
			var circle = new L.circleMarker([parsedData[i].lat, parsedData[i].lng], {color:'white'});
			circle.setRadius(3);
		}
		

		circle.bindPopup(parsedData[i].Summary);
		if (parsedData[i]["Victim's Gender"] == 'Male') {
			circle.addTo(male);
			if (parsedData[i]["Race"] == 'White') {
				count1++;
			} else {
				count3++;
			}
		} else {
			if (parsedData[i]["Victim's Gender"] == 'Female'){
				circle.addTo(female);
			} else {
				circle.addTo(unknown);
			}
			if (parsedData[i]["Race"] == 'White') {
				count2++;
			} else {
				count4++;
			}
		}
	}
	
	male.addTo(map);
	female.addTo(map);
	unknown.addTo(map);

	var layers = {
		"male": male,
		"female": female,
		"unknown": unknown
	}
  	L.control.layers(baseLayers, layers).addTo(map);
  	table(count1, count2, count3, count4);
}

var table = function(count1, count2, count3, count4){
	if ($("#myTable tbody").length == 0) {
		$("#myTable").append("<tbody></tbody>");
	}
	$("#myTable tbody").append( "<tr>" + "<td><b>White</b></td>" + "<td>" + count1 + "</td>" + "<td>" + count2 + "</td>" + "</tr>" );
	$("#myTable tbody").append( "<tr>" + "<td><b>Non-White</b></td>" + "<td>" + count3 + "</td>" + "<td>" + count4 + "</td>" + "</tr>" );
}



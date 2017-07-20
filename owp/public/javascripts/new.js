$(document).ready(function() {

var markers =[];

	var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: -34.397, lng: 150.644}
  });

  var geocoder = new google.maps.Geocoder();

  $('#submit').on('click', function(e) {
		e.preventDefault();
    geocodeAddress(geocoder, map);
  });

	function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
	setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}

  function geocodeAddress(geocoder, resultsMap) {
	  var address = document.getElementById('address').value;
	  console.log("The adress is " + address);
		var buttonCreate = document.getElementById('newResButton');
	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === 'OK') {
	      resultsMap.setCenter(results[0].geometry.location);
				if (markers.length == 0){
					var marker = new google.maps.Marker({
						map: resultsMap,
						position: results[0].geometry.location
					});
					markers.push(marker);
				} else {
				setMapOnAll(null);
				deleteMarkers();
				var marker1 = new google.maps.Marker({
					map: resultsMap,
					position: results[0].geometry.location
				});
				markers.push(marker1);
				}
	      document.getElementById('lat').value = results[0].geometry.location.lat();
	      document.getElementById('lon').value = results[0].geometry.location.lng();

				if (!buttonCreate){
				var $button = $('<input>').attr('id', 'newResButton').attr('type','submit').attr('value','Crea el restaurante');
				$("#restform").append($button);
				}

				} else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}
});

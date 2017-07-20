$(document).ready(function(){


var myLatLng = {lat: plan.location.coordinates[0], lng: plan.location.coordinates[1]};

var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 15,
	center: myLatLng
});

var marker = new google.maps.Marker({
	position: myLatLng,
	map: map,
	title: plan.title
});

});


/*

	function initMap() {
	 var myLatLng = {lat: myCampaing.lat, lng: myCampaing.log};

	 var map = new google.maps.Map(document.getElementById('map'), {
	   zoom: 18,
	   center: myLatLng
	 });

	 var marker = new google.maps.Marker({
	   position: myLatLng,
	   map: map,
	   title: 'Hello World!'
	 });
	}
	initMap();

	*/

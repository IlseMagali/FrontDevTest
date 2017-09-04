var map;
var settings;
var service;
var infowindow;

// Initialize geolocation
	if (navigator.geolocation) {

    function error(err){
      console.warn("Error!" + err.code + " :( " + err.message);
    }

    function success(position){
      settings = {
    		lat: position.coords.latitude,
    		lng: position.coords.longitude
    	};
      console.log(settings);
    }
    // Configuration of the reference position
		position = navigator.geolocation.getCurrentPosition(success, error);
	}
// End geolocation

function initMap() {

  // Create the instance of a google's map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat:19.3588611,
      lng:-99.23398739999999
    },
    zoom: 13
  });

  // Make the search of the service place into the map with a reference of closeness with a radius of 10km
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: {
      lat:19.3588611,
      lng:-99.23398739999999
    },
    radius: 10000,
    type: ['hospital']
  }, callback);
}

// Show a marker for each element into the array results
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      // console.log(results[i].name);
    }
  }
}

// Create each marker with the place's location
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  // console.log(place);

  // Configure the popup for each marker that shows info about the place when the user click's on the marker
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name + "<br>" + place.vicinity);
    infowindow.open(map, this);
  });
}


/*
var day = DAY;


var location = {
  datetime: type: Date,
  longitude: Number,
  latitude: Number,
  altitude : Number,
  speed : Number,
  status: String
};

// http://localhost:3000/api/locations/daily/day2

$.get("http://localhost:3000/api/locations/daily/"+DAY){
	[{location}, {location}];
};
*/

var locations = [
    [32.681691, -4.735743],
    [32.451755, -4.490545],
    [32.235401, -4.631820]
  ];

function initMap() {
  mapDay = new google.maps.Map(document.getElementById('mapDay'), {
    zoom: 8,
    center: new google.maps.LatLng(32.451755, -4.490545)
  });

  var marker, i;

  for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][0], locations[i][1]),
          map: mapDay
        });
  }
}

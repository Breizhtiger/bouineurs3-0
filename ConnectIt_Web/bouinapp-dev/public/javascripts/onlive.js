var day = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
var fullDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

// Requête l'api pour récupérer les localisations
function initLocation(){
  $(document).ready(function () {
    $.get(fullDomain+"/api/locations/daily/"+day, function(data) {
          initMap(data);
    }).fail(function() {alert("error");});
  });
}

// Initialisation de la google map avec les markers
function initMap(data){
  // Init map
  mapDay = new google.maps.Map(document.getElementById('mapDay'), {
    zoom: 5,
    center: new google.maps.LatLng(data[60].latitude, data[60].longitude)
  });

  // Positionnement markers
  for (i = 0; i < data.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
      map: mapDay
    });
  }
}

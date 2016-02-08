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
    center: new google.maps.LatLng(data[data.length/2].latitude, data[data.length/2].longitude)
  });
  
  var bounds = new google.maps.LatLngBounds();
  
  // Positionnement markers
  for (i = 0; i < data.length; i++) {
    bounds.extend(new google.maps.LatLng(data[i].latitude, data[i].longitude));
    mapDay.fitBounds(bounds);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
      map: mapDay,
      icon: '/static/images/car.png'
    });
    
    marker.addListener('click', function() {
        alert('click marker' + marker.getPosition());
        clickMarker(marker.getPosition()); 
    });
  }
}

// Au click d'un marker
function clickMarker(position){
    // to implement
}

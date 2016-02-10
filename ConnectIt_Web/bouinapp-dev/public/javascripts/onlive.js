var day = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
var fullDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
 
// Requête l'api pour récupérer les localisations
function initLocation(){
  $(document).ready(function () {
    $.get(fullDomain+"/api/locations/daily/"+day, function(data) {
        if(data.length > 0){ 
          initMap(data);
        }
        else{
            document.getElementById('mapDay').innerHTML += "Pas données de géolocalisation :'(";
        }
    }).fail(function() {document.getElementById('mapDay').innerHTML += "Erreur de l'API de géolocalisation :'(";});
  });
}

// Initialisation de la google map avec les markers
function initMap(data){
  // Init map
  mapDay = new google.maps.Map(document.getElementById('mapDay'), {});
  
  var bounds = new google.maps.LatLngBounds();
  
  // Positionnement markers
  for (i = 0; i < data.length; i++) {
    if(data[i].latitude != null || data[i].latitude != 0 || data[i].longitude != null || data[i].longitude != 0){
        // Calcule de la zone à afficher
        bounds.extend(new google.maps.LatLng(data[i].latitude, data[i].longitude));
        mapDay.fitBounds(bounds);
        
        // Création du marker
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
        map: mapDay,
        icon: '/static/images/car.png'
        });
        
        // Création de l'infobulle
        var contentString = "<img src='/static/images/magicTeam.jpg' width='300px' height='200px' />";
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        // Click sur un marker
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(mapDay, this);
        });
    }
  }
}
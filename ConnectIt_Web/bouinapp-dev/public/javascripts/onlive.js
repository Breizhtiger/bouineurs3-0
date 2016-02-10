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
        
        var contentString ="";
        
        // Récupération de l'image
        $.get(fullDomain+"/api/images/getByKey/"+data[i].datetime, function(dataImg) {
                if(dataImg.length > 0){
                    contentString = "<img src=\'" + fullDomain + localToPublic(dataImg[0].localPath) + "\' width='300px' height='200px'>";
                }
        }).fail(function() {document.getElementById('mapDay').innerHTML += "Erreur de l'API image :'(";});
        
        // Création de l'infobulle
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

// Retourne l'url public d'une image local
function localToPublic(localPath){
    if(localPath != null && localPath.length != 0){
        tabPath = localPath.split("public");
        if(tabPath != null && tabPath.length == 2){
            return "/static"+tabPath[1];
        }
        else{
            return localPath;
        }
    }
}

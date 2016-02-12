var day = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
var fullDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
 
// Requête l'api pour récupérer les localisations
function initLocation(){
  $(document).ready(function () {
    $.get(fullDomain+"/api/locations/dailyWithPhoto/"+day, function(data) {
        if(data.length > 0){ 
          initMap(data);
        }
        else{
            document.getElementById('mapDay').innerHTML += "<h2>Pas de données disponibles...</h2>";
        }
    }).fail(function() {document.getElementById('mapDay').innerHTML += "<h2>Oups... quelque chose s'est mal passée...</h2>";});
  });
}

// Initialisation de la google map avec les markers
function initMap(data){
    // Init map
    mapDay = new google.maps.Map(document.getElementById('mapDay'), {});
    
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

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
                publicPath: data[i].publicPath,
                icon: '/static/images/car.png'
            });

            // Click sur un marker
            google.maps.event.addListener(marker, 'click', function () {
                if(this.publicPath == 'undefined' || this.publicPath == null){
                    this.publicPath = 'static/images/empty.png';
                }
                var content = "<img src=\'" + fullDomain + this.publicPath + "\' width='300px' height='200px'>"
                infowindow.setContent(content);
                infowindow.open(mapDay, this);
            });

        }
    }
}

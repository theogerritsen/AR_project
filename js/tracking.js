var path = window.location.pathname;

let mymap = L.map('map', {
    center: [46.520009, 6.629357],
    minZoom: 10,
	maxZoom: 18,
	zoom: 13
});


mymap.fitBounds([
    [46.5184540, 6.6240245],
    [46.5233845, 6.6360568]
]);

const mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlb2dlcnJpdHNlbiIsImEiOiJja3R2Zzkybzkwa25oMm5tcGp1MWY0enh1In0.n_ye_r9ELbLqxyWl-giSlA', {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
    );

const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  	attribution: '&copy; OpenStreetMap contributors'
});

mapbox.addTo(mymap);

lc = L.control.locate({

}).addTo(mymap);

n = 0

// si le user est en mode jeu, on transforme le n

let coords_dict = [];
// on va chercher à quel étape le user est si il a choisi le mode jeu
// pour montrer uniquement le bon nombre de marqueur d'étape
let stepNumber = Number(sessionStorage.getItem("stepNum"));

let path_info;

// on itère à travers tous les arrêts
for (const feature of arret.features){
    n++;

    // si le user est en train d'utiliser le mode jeu
    if (sessionStorage.getItem("gameMode") == "true") {
        // et si le nombre d'arrêts qui sont en train d'être itéré
        // devient plus grand que valeur de l'étape que le user est actuellement
        // on casse la boucle pour ne montrer que le bon nombre d'étape.
        if (n > stepNumber)
        break;
    }

    // si le user est en mode jeu, on transforme n en stepNum 
    // (le numéro de l'étape auquel il se trouve) pour ne montrer
    // que les marqueurs qu'il a développé
    
    let path = '../assets/marqueurs_etapes/etape' + n + '.png';
    let path_arjs = '../ar_files/step' + n + '.html';

    if (n == 1) {
        path_info = 'https://igd.unil.ch/geoguidelsne/#stop8';
    }
    if (n == 2) {
        path_info = 'https://igd.unil.ch/geoguidelsne/#stop9';
    }
    if (n == 3) {
        path_info = 'https://igd.unil.ch/geoguidelsne/#stop10';
    }
    let lat = feature.geometry.coordinates[0];
    let long = feature.geometry.coordinates[1];
    let coords = [long, lat];

    let url = feature.properties.url;
    
    coords_dict.push({
        
        key: "marqueur" + n,
        
        value: coords
    });
    let marqueur_etape = L.icon({
        iconUrl: path,
        iconSize: [50, 50],
        iconAnchor:   [25, 50]
    });

    let marqueur = L.marker(coords, {icon: marqueur_etape}).addTo(mymap);

    let popupContent = "<b><a href=" + path_arjs + ">Commencer l'AR</a></b> <br><br> <b><a href=" + path_info + ">Information</a></b>";

    marqueur.bindPopup(popupContent);

    // si le n de la boucle est égal à la variable globale qui calcule
    // le nombre d'étape, on break la boucle à ce moment la
}

if (sessionStorage.getItem("gameMode") == "false") {
    L.geoJSON(sentier, {
        style: function(feature) {
            return {
                color: "#c0904d",
                weight: 5
            };
        }
    }).addTo(mymap)
}


let arPath = 'ar_files/';

const $divAR = $("#itin-rdv");

let step = [];
for (i = 1; i <= 10; ++i){
    this["step"+i] = "step" + i + ".html"
}

m = 0;

let step_coordinates = [];

lc._activate();

$divAR.append("<button class='itin-btn' id='rdv-btn' disabled>Rendez-vous à la prochaine étape</button>");

currentPos = null;
mymap.on('locationfound', function(evt){
    
    currentPos = [JSON.stringify(Math.round(evt.latlng.lat*10000)/10000), JSON.stringify(Math.round(evt.latlng.lng*10000)/10000)];
 
    let userPosition = '[' + currentPos[0] + ',' + currentPos[1] + ']';

    for (var value in coords_dict) {

        markerPosition = '[' + JSON.stringify(Math.round(coords_dict[value].value[0]*10000)/10000) + ',' + JSON.stringify(Math.round(coords_dict[value].value[1]*10000)/10000) + ']';

        if (userPosition == markerPosition) {
            
            $("#itin-rdv #go-ar-btn").remove();
            $("#itin-rdv #rdv-btn").remove();
            
            $divAR.append("<button class='itin-btn' id='go-ar-btn'>Commencer le tour en réalité augmentée</button>");
            
            $(function(){
                $("#go-ar-btn").click(function(){

                    $( ".itin-rdv" ).css('background-color', 'red');
                    
                    if (userPosition == '[46.523,6.635]'){
                        window.location.href = arPath + step1;
                    }
                    if (userPosition == '[46.523,6.633]'){
                        window.location.href = arPath + step2;
                    }
                    if (userPosition == '[46.523,6.632]'){
                        window.location.href = arPath + step3;
                    }
                    if (userPosition == '[46.5223,6.6304]'){
                        window.location.href = arPath + step4;
                    }
                    if (userPosition == '[46.5207,6.6324]'){
                        window.location.href = arPath + step5;
                    }
                    if (userPosition == '[46.5207,6.6304]'){
                        window.location.href = arPath + step6;
                    }
                    if (userPosition == '[46.5223,6.6302]'){
                        window.location.href = arPath + step7;
                    }
                    if (userPosition == '[46.5191,6.6264]'){
                        window.location.href = arPath + step8;
                    }
                    if (userPosition == '[46.5132,6.6488]'){
                        window.location.href = arPath + step9;
                    }
                    if (userPosition == '[46.5139,6.6480]'){
                        window.location.href = arPath + step10;
                    }

                })
            })
            
            break;
        }
        else {
            
            $("#itin-rdv #go-ar-btn").remove();
            $("#itin-rdv #rdv-btn").remove();
            
            $divAR.append("<button class='itin-btn' id='rdv-btn' disabled>Rendez-vous à la prochaine étape</button>");
        };
    };
});


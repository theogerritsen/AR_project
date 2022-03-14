let mymap = L.map('map', {
    center: [46.520009, 6.629357],
    minZoom: 10,
	maxZoom: 18,
	zoom: 13
});

// fit bounds pour voir tout le sentier sur n'importe quel device
mymap.fitBounds([
    [46.5184540, 6.6240245],
    [46.5233845, 6.6360568]
])

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

// ajout des icones personalisés

///////////////////////////////////////////////////////////////////
////////// GESTION DES ARRETS /////////////////////////////////
////////////////////////////////////////////////////////////    

// ajout dynamique des marqueurs pour faire correspondre aux étapes

// on initialise n à 0
n = 0

// on crée un array vide pour accueillir les coordonnées de chaque marqueur

let coords_dict = [];
for (const feature of arret.features){
    // pour chaque feature trouvé (étape), on incrémente n de 1
    n++;
    // on utilise ce n avec le chemin relatif des icones de chaque étape
    let path = 'assets/marqueurs_etapes/etape' + n + '.png';
    let lat = feature.geometry.coordinates[0];
    let long = feature.geometry.coordinates[1];
    let coords = [long, lat];
    
    // pour chaque coordonnée trouvée, on l'ajoute à notre array vide
    coords_dict.push({
        // avec comme clé "marqueur" + le numéro correspond
        key: "marqueur" + n,
        // avec comme valeur les coordonnées lat long contenus dans un array
        value: coords
    });

    let marqueur_etape = L.icon({
        iconUrl: path,
        iconSize: [50, 50],
        iconAnchor:   [25, 50]
    })
    let marqueur = L.marker(coords, {icon: marqueur_etape}).addTo(mymap)
};

// console.log(coords_dict);

// polyline du parcours à faire et ajout à la carte
L.geoJSON(sentier, {
    style: function(feature) {
        return {
            color: "blue",
            weight: 5
        };
    }
}).addTo(mymap)

// initialisation du bouton Commencer le sentier
$(function(){
    $("#itin-btn").click(function(){
        // on ajoute la classe active au bouton s'il est appuyé
        $("#itin-go").toggleClass('active');
        // $(this).toggleClass('active');
        // dès que le user a appuyé sur le bouton, on active le control locate
        lc._activate();
        // on ajoute un pop up : rendez-vous à la première étape
        $("#itin-rdv").append("<button class='itin-btn' id='itin-btn' disabled>Rendez-vous à la première étape</button>");
        // on va aller chercher la position en temps réel de l'utilisateur
        currentPos = null;
        mymap.on('locationfound', function(evt){

            currentPos = [evt.latlng.lat, evt.latlng.lng];

            // il faut ensuite matcher la position de l'utilisateur avec la position des marqueurs (étapes)
            // pour cela, il faut laisser une certaine marge de précision pour que l'utilisateur n'ait pas
            // à être exactement au bon endroit
            // il faut donc convertir notre array lat long en string pour récupérer un nombre à 6 décimales
            // puis reconvertir le tout en float pour retourner à un array avec nos lat long
            // en degré une précision à 4 décimales est précis de 11.1m (+ - 5.55m), nous pouvons donc couper
            // notre array à 4 décimales pour permettre une marge de manoeuvre
            let userPosition = [parseFloat(currentPos[0].toString().slice(0,7)), parseFloat(currentPos[1].toString().slice(0,6))]
            console.log("user position: ", userPosition);
            // il faut matcher la position de l'utilisateur avec la position des marqueurs
            for (var value in coords_dict) {
                let markerPosition = [parseFloat(coords_dict[value].value[0].toString().slice(0,7)),parseFloat(coords_dict[value].value[1].toString().slice(0,6))];
                console.log("marker position: ", markerPosition)
                if (userPosition == coords_dict[value].value) {
                    console.log("its a match")
                }
                else {
                    break;
                };
                
                // if (currentPos.filter(element => coords_dict[value].value)){
                //     console.log("its a match")
                // }
                // else {
                //     console.log("its not a match")
                // };
            };
        });
        //
    })
})



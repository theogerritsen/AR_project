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
for (const feature of arret.features){
    // pour chaque feature trouvé (étape), on incrémente n de 1
    n++;
    // on utilise ce n avec le chemin relatif des icones de chaque étape
    let path = 'assets/marqueurs_etapes/etape' + n + '.png';
    let lat = feature.geometry.coordinates[0];
    let long = feature.geometry.coordinates[1];
    let coords = [long, lat];

    let marqueur_etape = L.icon({
        iconUrl: path,
        iconSize: [50, 50],
        iconAnchor:   [25, 50]
    })
    let marqueur = L.marker(coords, {icon: marqueur_etape}).addTo(mymap)
}

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
        $("#itin-rdv").append("<button class='itin-btn' id='itin-btn' disabled>Rendez-vous à la première étape</button>")
    })
})



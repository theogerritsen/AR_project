let mymap = L.map('map', {
    center: [46.520009, 6.629357],
    minZoom: 10,
	maxZoom: 18,
	zoom: 13
});

const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  	attribution: '&copy; OpenStreetMap contributors'
});

osmLayer.addTo(mymap);

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

L.geoJSON(sentier, {
    style: function(feature) {
        return {
            color: "blue",
            weight: 5
        };
    }
}).addTo(mymap)

// new L.GeoJSON(arret).addTo(mymap);
// icon = L.divIcon({
//     className: 'marker',
// })


// // on initialise n à 0 pour montrer les marqueurs par étape
// let n = 0

// for (const feature of arret.features) {
//     // pour chaque feature trouvé dans notre geojson
//     // on incrémente n de 1
//     n++;
//     // pour chaque arret, on crée un nouveau div dans l'html
//     const el = document.createElement('div');
//     el.className = 'marker';

//     // on va chercher le marqueur qui correspond à la bonne étape
//     el.style.backgroundImage = 'url(./assets/marqueurs_etapes/etape' + n + '.png';


//     // on  va chercher les coordonnées de chacun de nos marqueurs
//     L.marker(latlng)
//     setLngLat(feature.geometry.coordinates)
//     addTo(mymap);
// }

// let iconePerso = L.icon({
//     iconUrl: 'https://raw.githubusercontent.com/ssuter6/Geovis2/main/figs/icone_rouge.svg',
//     iconSize: [28,41]
// });

// function onEachFeature(feature, layer) {
//     if (layer instanceof L.marker) {
//         layer.setIcon()
//     }
// }
// let etape = new L.geoJson(arret, {
//     onEachFeature: onEachFeature,
//     pointToLayer: function(feature, latlng){
//         return L.marker(latlng, {icon: iconePerso})
//     }
// }).addTo(mymap)